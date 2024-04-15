"use server"

import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas/settings";
import { getUserByEmail, getUserById } from "@/db/user.db";
import { currentServerUser } from "@/lib/auth-session";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationTokenEmail } from "@/lib/mail";
import bcrypt from 'bcryptjs';


interface SettingsResponse {
    status: "error" | "success" | "unauthorized" | "forbidden",
    message: string;
}

export const settings = async(values: z.infer<typeof SettingsSchema>): Promise<SettingsResponse> => {
    try {
        const user = await currentServerUser();

        if(!user) {
            return {
                status: "unauthorized",
                message: "The user is unauthorized"
            }
        }

        const dbUser = await getUserById(user?.id || '');

        if(!dbUser) {
            return {
                status: "unauthorized",
                message: "The user is unauthorized"
            }
        }

        if(user.isOAuth) {
            values.email = undefined;
            values.password = undefined;
            values.newPassword = undefined;
            values.isTwoFactorEnabled = undefined;
        }

        if(values.email && values.email !== user.email) {
            const existingUser = await getUserByEmail(values.email);
            if(existingUser && existingUser.id !== user.id) {
                return {
                    status: "error",
                    message: "Email already taken"
                }
            }

            const verificationToken = await generateVerificationToken(values.email);
            if(!verificationToken) {
                return {
                    status: "error",
                    message: "A problem has ocurred, if this continue, report the issue."
                }
            }
            await sendVerificationTokenEmail(values.email, verificationToken?.token);
            return {
                status: "success",
                message: "Verification email send."
            }
        }

        if( values.password && values.newPassword && dbUser.password ) {
            const passwordMatch = await bcrypt.compare(
                values.password,
                dbUser.password
            );

            if(!passwordMatch) {
                return {
                    status: "error",
                    message: "Incorrect password."
                }
            }

            const hashedPassword = await bcrypt.hash(values.password, 10);
            values.password = hashedPassword;
            values.newPassword = undefined;
        }

        await db.user.update({
            where: { id: dbUser.id },
            data: { ...values }
        });

        return {
            status: "success",
            message: "Settings Updated!"
        }

    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Unexpeted error, please try again or conctact with support team"
        }
    }
}

