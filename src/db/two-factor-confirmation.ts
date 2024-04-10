import { db } from "@/lib/db";
import { TwoFactorConfirmation } from "@prisma/client";


export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId }
        });

        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}

export const createTwoFactorConfirmation = async (values: Omit<TwoFactorConfirmation, 'id'>) => {
    try {
        await db.twoFactorConfirmation.create({
            data: values
        });
    } catch (error) {
        console.log(error)
    }
}

export const deleteTwoFactorConfirmationById = async (id: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { id }
        });

        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}