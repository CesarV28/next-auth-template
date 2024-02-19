import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";


export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({
            where: { token }
        });

        return passwordToken;
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findFirst({
            where: { email }
        });

        return passwordToken;
    } catch (error) {
        return null;
    }
}

export const createPasswordResetToken = async (values: Omit<PasswordResetToken, 'id'>) => {
    try {
        const newPasswordResetToken = await db.passwordResetToken.create({
            data: values
        });

        return newPasswordResetToken;
    } catch (error) {
        return null;
    }
}

export const deletePasswordResetTokenById = async (id: string) => {
    try {
        await db.passwordResetToken.delete({
            where: { id }
        });

        return id;
    } catch (error) {
        return null;
    }
}