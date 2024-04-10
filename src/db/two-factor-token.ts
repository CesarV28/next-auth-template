import { db } from "@/lib/db";
import { TwoFactorToken } from "@prisma/client";


export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token }
        });

        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email }
        });

        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const createTwoFactorToken = async (values: Omit<TwoFactorToken, 'id'>) => {
    try {
        const newTwoFactorToken = await db.twoFactorToken.create({
            data: values
        });

        return newTwoFactorToken;
    } catch (error) {
        return null;
    }
}

export const deleteTwoFactorTokenTokenById = async (id: string) => {
    try {
        await db.twoFactorToken.delete({
            where: { id }
        });

        return id;
    } catch (error) {
        return null;
    }
}