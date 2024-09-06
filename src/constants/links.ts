import {
    ShoppingCart,
    LayoutDashboard,
    UsersRound,
    LucideIcon,
    Settings,
    UserRoundCog,
} from "lucide-react";


interface AdminSidebarLink {
    title: string;
    href: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    label?: string;
    allowRoles?: string[];
}
export const ADMIN_SIDEBAR_LINKS: AdminSidebarLink[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        variant: "ghost",
        label: "Dashboard"
    },
    {
        title: "Server",
        href: "/server",
        icon: UsersRound,
        variant: "ghost",
        label: "Server"
    },
    {
        title: "Client",
        href: "/client",
        icon: ShoppingCart,
        variant: "ghost",
        label: "Client"
    },
]


export const COMMON_SIDEBAR_LINKS: AdminSidebarLink[] = [
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        variant: "ghost",
        label: "Settings"
    },
    {
        title: "Admin",
        href: "/admin",
        icon: UserRoundCog,
        variant: "ghost",
        label: "Admin"
    },
]