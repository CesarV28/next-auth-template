import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { DefaultSession, User } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    roles: UserRole
    isTwoFactorEnabled: boolean,
    isOAuth: boolean;
}

export const currentServerUser = async (): Promise<ExtendedUser | undefined> => {
    try {
        const session = await auth();
        return session?.user
    } catch (error) {
        return undefined
    }
}

export const currentServerUserRoles = async (): Promise<UserRole | undefined> => {
    try {
        const session = await auth();
        return session?.user.roles
    } catch (error) {
        return undefined
    }
}