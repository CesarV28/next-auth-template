

export declare module "next-auth" {
    interface Session {
        user: {
            roles: "ADMIN" | "USER" | "GUEST"
        } & DefaultSession["user"]
    }
}

export declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        roles?: "ADMIN" | "USER" | "GUEST"
    }
}