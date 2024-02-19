import { db } from '@/lib/db';
import { VerificationToken } from '@prisma/client';



export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({ 
            where: { email } 
        });

        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({ 
            where: { token } 
        });

        return verificationToken;
    } catch (error) {
        return null;
    }
}

export const createVerificationToken = async (values: Omit<VerificationToken, 'id'>) => {
    try {
        const newVerificationToken = await db.verificationToken.create({
            data: values
        });

        return newVerificationToken;
    } catch (error) {
        return null;
    }
}


export const deleteVerificationTokenById = async (id: string) => {
    try {
        await db.verificationToken.delete({
            where: { id }
        });

        return id;
    } catch (error) {
        return null;
    }
}