import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib//db";
import { getUserById } from "@/db/user.db";
import { deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from "@/db/two-factor-confirmation";



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({ 
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            // Allow 0Auth without email verification
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || ''); 

            // Prevent singin without emailVerification
            if(!existingUser || !existingUser.emailVerified) {
                return false;
            }

            if( existingUser.isTwoFactorEnabled ) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if(!twoFactorConfirmation) return false;
                
                await deleteTwoFactorConfirmationById(twoFactorConfirmation.id);
            }

            return true;
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.roles && session.user) {
                session.user.roles = token.roles;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            
            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;
            
            token.roles = existingUser.roles;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});