import { v4 as uuidV4 } from 'uuid';
import crypto from 'crypto';
import { createVerificationToken, deleteVerificationTokenById, getVerificationTokenByEmail } from '@/db/verification-token';
import { getPasswordResetTokenByEmail, deletePasswordResetTokenById, createPasswordResetToken } from '@/db/password-reset-token';
import { createTwoFactorToken, deleteTwoFactorTokenTokenById, getTwoFactorTokenByEmail } from '@/db/two-factor-token';


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if( existingToken ) {
        await deleteTwoFactorTokenTokenById(existingToken.id);
    }

    const twoFactorToken = await createTwoFactorToken({ 
        email, 
        token, 
        expires 
    });

    return twoFactorToken;
}

export const generatePasswordVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if( existingToken ) {
        await deletePasswordResetTokenById(existingToken.id);
    }

    const passwordResetToken =await createPasswordResetToken({
        email,
        expires,
        token
    });

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if( existingToken ) {
        await deleteVerificationTokenById(existingToken.id);
    }

    const verificationToken = await createVerificationToken({ 
        email, 
        token, 
        expires 
    });

    return verificationToken;
}



