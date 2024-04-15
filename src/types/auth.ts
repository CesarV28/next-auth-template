import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type SessionUser = DefaultSession["user"] & {
    roles: UserRole
    isTwoFactorEnabled: boolean,
    isOAuth: boolean;
}
