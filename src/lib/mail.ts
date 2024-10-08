import env from '@/constants/envs';

import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    try {

        await resend.emails.send({
            from: `Email by Auth NextJs Template <${env.RESEND_EMAIL_FROM}>`,
            to: [email],
            subject: 'Next Auth Template 2FA Code',
            html: `<p>Your 2FA code <strong>${token}</strong></p>`,
            text: 'it works!',
        });
   
    } catch (error) {
        console.log(error)
    }
}


export const sendPasswordResetTokenEmail = async (email: string, token: string) => {
    try {
        const resetLink = `${env.APP_URL}/auth/new-password?token=${token}`;

        await resend.emails.send({
            from: `Email by Auth NextJs Template <${env.RESEND_EMAIL_FROM}>`,
            to: [email],
            subject: 'Next Auth Template Reset Password',
            html: `<p>Reset yout password clicking here <a href="${resetLink}" ><strong>Reset Password</strong></a>!</p>`,
            text: 'it works!',
        });
   
    } catch (error) {
        console.log(error)
    }
}


export const sendVerificationTokenEmail = async (email: string, token: string) => {
    try {
        const confirmLink = `${env.APP_URL}/auth/new-verification?token=${token}`;

        const response = await resend.emails.send({
            from: `Email by Auth NextJs Template <${env.RESEND_EMAIL_FROM}>`,
            to: [email],
            subject: 'Next Auth Template Confirm email',
            html: `<p>Congrats click here to <a href="${confirmLink}" ><strong>confirm email</strong></a>!</p>`,
            text: 'it works!',
        });
   
    } catch (error) {
        console.log(error)
    }
}