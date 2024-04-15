import { UserRole } from "@prisma/client";
import * as z from "zod";


export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email({ message: "Must be a valid email."})),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string().min(6, {message: "Must be 6 characteres"})),
    isTwoFactorEnabled: z.optional(z.boolean()),
    roles: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.GUEST])
}).refine((data) => {
    if(data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "New password is required",
    path: ["newPassword"]
}).refine((data) => {
    if(data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Password is required",
    path: ["password"]
});