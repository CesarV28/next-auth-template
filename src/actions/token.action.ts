"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import bcryptjs from 'bcryptjs'
import { getUserByEmail } from "@/db/user.db"
import { getVerificationTokenByToken, deleteVerificationTokenById } from "@/db/verification-token"
import { generatePasswordVerificationToken } from "@/lib/tokens";
import { sendPasswordResetToken } from "@/lib/mail";
import { NewPasswordSchema, ResetSchema } from "@/schemas/login";
import { getPasswordResetTokenByToken } from "@/db/password-reset-token"


interface Message {
    status: "error" | "success",
    message: string;
}

export const newVerification = async (token: string): Promise<Message> => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            status: "error",
            message: "Token does not exist"
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            status: "error",
            message: "Token has expired!"
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            status: "error",
            message: "Email does not exist"
        }
    }

    await db.user.update({
        where: { id: existingUser?.id || '' },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await deleteVerificationTokenById(existingToken.id);

    return {
        status: "success",
        message: "Email verified!"
    }
}

export const reset = async (values: z.infer<typeof ResetSchema>): Promise<Message> => {

    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Invalid email!"
        }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            status: "error",
            message: "Email not found"
        }
    }

    const passwordResetToken = await generatePasswordVerificationToken(email);

    await sendPasswordResetToken(
        passwordResetToken?.email || '',
        passwordResetToken?.token || ''
    )

    return {
        status: "success",
        message: "Confirmation email sent!"
    }
}


export const newPasswordReset = async (values: z.infer<typeof NewPasswordSchema>, token: string): Promise<Message> => {

    if(!token) {
        return {
            status: "error",
            message: "Token is missing!"
        } 
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Check passwords"
        }
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if( !existingToken ) {
        return {
            status: "error",
            message: "Invalid token!"
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            status: "error",
            message: "Token has expired!"
        }
    }

    
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            status: "error",
            message: "Email does not exist"
        }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    return {
        status: "success",
        message: "The password has been updated successfully!"
    }
}