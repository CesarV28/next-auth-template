"use server"


import * as z from 'zod';
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from '@/schemas/login';
import { db } from '@/lib/db'

import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/db/user.db';
import { signIn, signOut } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens';
import { sendVerificationTokenEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { deleteTwoFactorTokenTokenById, getTwoFactorTokenByEmail } from '@/db/two-factor-token';
import { createTwoFactorConfirmation, deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from '@/db/two-factor-confirmation';

interface AuthResponse {
    status: "error" | "success" | "two-factor",
    message: string;
}

export const login = async (values: z.infer<typeof LoginSchema>): Promise<AuthResponse> => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Invalid Fields!"
        }
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            status: "error",
            message: "Email does not exist"
        }
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationTokenEmail(
            verificationToken?.email || '',
            verificationToken?.token || ''
        );

        return {
            status: "success",
            message: "Confirmation email sent!"
        }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken) {
                return {
                    status: "error",
                    message: "Invalid code!"
                }
            }
            if (twoFactorToken.token !== code) {
                return {
                    status: "error",
                    message: "Invalid code!"
                }
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return {
                    status: "error",
                    message: "Code expired!"
                }
            }

            await deleteTwoFactorTokenTokenById(twoFactorToken.id);
            const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingTwoFactorConfirmation) {
                await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id);
            }

            await createTwoFactorConfirmation({
                userId: existingUser.id
            });

        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(
                twoFactorToken?.email || '',
                twoFactorToken?.token || ''
            )

            return {
                status: "two-factor",
                message: "Code verification sended"
            }
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
        return {
            status: "success",
            message: "Access correct"
        }
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        status: "error",
                        message: "Invalid Credentials"
                    }
                default:
                    return {
                        status: "error",
                        message: "Something went wrong to authenticated"
                    }
            }
        }
        throw error
    }
}

export const register = async (values: z.infer<typeof RegisterSchema>): Promise<AuthResponse> => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Invalid Fields!"
        }
    }

    const { email, name, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            status: "error",
            message: "Email already taken."
        }
    }

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    if (!user) {
        return {
            status: "error",
            message: "Oops!, something went wrong!"
        }
    }

    const verificationToken = await generateVerificationToken(user.email || '');

    await sendVerificationTokenEmail(
        verificationToken?.email || '',
        verificationToken?.token || ''
    );

    return {
        status: "success",
        message: "Confirmation email sent!"
    }
}


export const logout = async (): Promise<AuthResponse> => {
    try {
        await signOut()
        
        return {
            status: "success",
            message: "Logout successfully!"
        }
    } catch (error) {
        return {
            status: "error",
            message: "Unexpected error ocurred"
        }
    }
}

