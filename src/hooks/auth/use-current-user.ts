import { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';
import { useSession } from 'next-auth/react';

export type ExtendedUser = DefaultSession["user"] & {
    roles: UserRole
    isTwoFactorEnabled: boolean,
    isOAuth: boolean;
}

export const useCurrentUser = (): ExtendedUser => {
    const session = useSession();

    return session.data?.user;
}
