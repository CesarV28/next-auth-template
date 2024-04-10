"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import bcryptjs from 'bcryptjs'
import { getUserByEmail } from "@/db/user.db"
import { getVerificationTokenByToken, deleteVerificationTokenById } from "@/db/verification-token"
import { generatePasswordVerificationToken } from "@/lib/tokens";
import { sendPasswordResetTokenEmail } from "@/lib/mail";
import { NewPasswordSchema, ResetSchema } from "@/schemas/login";
import { getPasswordResetTokenByToken } from "@/db/password-reset-token"


/**
 * Represents the structure of a message with status and message fields.
 */
interface Message {
    status: "error" | "success"; // Status of the message, can be "error" or "success".
    message: string; // The message content.
}

/**
 * Creates a new verification process for a given token.
 * @param token The verification token.
 * @returns A Promise resolving to a Message object indicating the result of the verification process.
 */
export const newVerification = async (token: string): Promise<Message> => {
    // Check if the token exists in the database.
    const existingToken = await getVerificationTokenByToken(token);

    // If the token does not exist, return an error message.
    if (!existingToken) {
        return {
            status: "error",
            message: "Token does not exist"
        };
    }

    // Check if the token has expired.
    const hasExpired = new Date(existingToken.expires) < new Date();

    // If the token has expired, return an error message.
    if (hasExpired) {
        return {
            status: "error",
            message: "Token has expired!"
        };
    }

    // Check if the user associated with the token exists.
    const existingUser = await getUserByEmail(existingToken.email);

    // If the user does not exist, return an error message.
    if (!existingUser) {
        return {
            status: "error",
            message: "Email does not exist"
        };
    }

    // Update the user's email verification status and email address.
    await db.user.update({
        where: { id: existingUser?.id || '' },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    // Delete the verification token from the database.
    await deleteVerificationTokenById(existingToken.id);

    // Return a success message indicating that the email has been verified.
    return {
        status: "success",
        message: "Email verified!"
    };
};

/**
 * Resets a user's password.
 * @param values The values containing email for password reset.
 * @returns A Promise resolving to a Message object indicating the result of the password reset process.
 */
export const reset = async (values: z.infer<typeof ResetSchema>): Promise<Message> => {
    // Validate the input fields.
    const validatedFields = ResetSchema.safeParse(values);

    // If validation fails, return an error message.
    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Invalid email!"
        };
    }

    // Extract the email from the validated fields.
    const { email } = validatedFields.data;

    // Check if the user with the provided email exists.
    const existingUser = await getUserByEmail(email);

    // If the user does not exist, return an error message.
    if (!existingUser) {
        return {
            status: "error",
            message: "Email not found"
        };
    }

    // Generate a password reset token for the user's email.
    const passwordResetToken = await generatePasswordVerificationToken(email);

    // Send the password reset token to the user's email.
    await sendPasswordResetTokenEmail(
        passwordResetToken?.email || '',
        passwordResetToken?.token || ''
    );

    // Return a success message indicating that the confirmation email has been sent.
    return {
        status: "success",
        message: "Confirmation email sent!"
    };
};

/**
 * Sets a new password for a user based on a password reset token.
 * @param values The values containing the new password.
 * @param token The password reset token.
 * @returns A Promise resolving to a Message object indicating the result of the password reset process.
 */
export const newPasswordReset = async (values: z.infer<typeof NewPasswordSchema>, token: string): Promise<Message> => {
    // Check if the password reset token is missing.
    if (!token) {
        return {
            status: "error",
            message: "Token is missing!"
        };
    }

    // Validate the input fields.
    const validatedFields = NewPasswordSchema.safeParse(values);

    // If validation fails, return an error message.
    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Check passwords"
        };
    }

    // Extract the password from the validated fields.
    const { password } = validatedFields.data;

    // Check if the password reset token exists in the database.
    const existingToken = await getPasswordResetTokenByToken(token);

    // If the token does not exist, return an error message.
    if (!existingToken) {
        return {
            status: "error",
            message: "Invalid token!"
        };
    }

    // Check if the token has expired.
    const hasExpired = new Date(existingToken.expires) < new Date();

    // If the token has expired, return an error message.
    if (hasExpired) {
        return {
            status: "error",
            message: "Token has expired!"
        };
    }

    // Check if the user associated with the token exists.
    const existingUser = await getUserByEmail(existingToken.email);

    // If the user does not exist, return an error message.
    if (!existingUser) {
        return {
            status: "error",
            message: "Email does not exist"
        };
    }

    // Hash the new password.
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password in the database.
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    });

    // Return a success message indicating that the password has been updated successfully.
    return {
        status: "success",
        message: "The password has been updated successfully!"
    };
};
