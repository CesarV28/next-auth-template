"use server"


import * as z from 'zod';
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema } from '@/schemas/login';
import { db } from '@/lib/db'

import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/db/user.db';
import { signIn } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import {  generateVerificationToken } from '@/lib/tokens';
import { sendVerificationToken } from '@/lib/mail';

interface Login {
    status: "error" | "success",
    message: string;
}

export const login = async (values: z.infer<typeof LoginSchema>): Promise<Login> => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            status: "error",
            message: "Invalid Fields!"
        }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            status: "error",
            message: "Email does not exist"
        }
    }

    if (!existingUser.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationToken(
            verificationToken?.email || '',
            verificationToken?.token || ''
        );

        return {
            status: "success",
            message: "Confirmation email sent!"
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

export const register = async (values: z.infer<typeof RegisterSchema>): Promise<Login> => {
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

    await sendVerificationToken(
        verificationToken?.email || '',
        verificationToken?.token || ''
    );

    return {
        status: "success",
        message: "Confirmation email sent!"
    }
}


