"use client"
import { useCurrentRole } from "@/hooks/auth/use-current-rol";
import { UserRole } from "@prisma/client";
import { FC } from "react";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

const RoleGate: FC<RoleGateProps> = ({ allowedRoles, children }) => {
    const role = useCurrentRole();

    return (
        <>
            {allowedRoles?.includes(role)
                ? <div>{children}</div>
                : <div>Error</div>
            }
        </>
    );
}

export default RoleGate;