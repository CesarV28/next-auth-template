import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { DefaultSession, User } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    roles: UserRole
    isTwoFactorEnabled: boolean
}

export const currentServerUser = async (): Promise<ExtendedUser | undefined> => {
    try {
        const session = await auth();
        return session?.user
    } catch (error) {
        return undefined
    }
}