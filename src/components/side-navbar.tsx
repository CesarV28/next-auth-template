"use client";

import { useState } from "react";
import { Nav } from "./nav";

import {
    ShoppingCart,
    LayoutDashboard,
    UsersRound,
    Settings,
    ChevronRight,
    UserRoundCog
} from "lucide-react";
import { Button } from "./ui/button";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { Separator } from "./ui/separator";
import UserAccountNav from "./auth/user-account-nav";


export const SideNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const user = useCurrentUser();


    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className={cn(
            "flex flex-col justify-between relative min-w-[80px] border-r px-3 pb-10 pt-24",
            !isCollapsed && "w-80"
        )}>
            <TooltipProvider delayDuration={1}>
                {true && (
                    <div className="absolute right-[-10px] top-7">
                        <Button
                            onClick={toggleSidebar}
                            variant="secondary"
                            className=" rounded-full p-1"
                        >
                            <ChevronRight className={cn(
                                "w-4 h-4 transition-transform duration-200 ease-in-out",
                                isCollapsed && "rotate-180"
                            )} />
                        </Button>
                    </div>
                )}
                <div>
                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Dashboard",
                                href: "/dashboard",
                                icon: LayoutDashboard,
                                variant: "ghost"
                            },
                            {
                                title: "Server",
                                href: "/server",
                                icon: UsersRound,
                                variant: "ghost"
                            },
                            {
                                title: "Client",
                                href: "/client",
                                icon: ShoppingCart,
                                variant: "ghost"
                            },
                        ]}
                    />
                </div>

                <div className="">
                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Settings",
                                href: "/settings",
                                icon: Settings,
                                variant: "ghost"
                            },
                            {
                                title: "Admin",
                                href: "/admin",
                                icon: UserRoundCog,
                                variant: "ghost"
                            },
                        ]}
                    />
                    <Separator />
                    <div className="mt-2 flex justify-center">
                        <UserAccountNav user={user} showName={!isCollapsed}/>
                    </div>
                </div>
            </TooltipProvider>
        </div>
    );
}