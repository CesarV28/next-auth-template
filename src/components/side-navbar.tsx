"use client";

import { useState } from "react";
import { Nav } from "./nav";

import {
    Settings,
    ChevronRight,
    UserRoundCog,
    Menu
} from "lucide-react";
import { Button } from "./ui/button";
import { TooltipProvider } from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { Separator } from "./ui/separator";
import UserAccountNav from "./auth/user-account-nav";
import { ADMIN_SIDEBAR_LINKS, COMMON_SIDEBAR_LINKS } from "@/constants/links";
import { ThemeToggle } from "./theme-toggle";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link";



export const SideNavbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const user = useCurrentUser();


    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <>
            <div className={cn(
                "hidden md:flex flex-col justify-between relative min-w-[80px] border-r px-3 pb-10 pt-24",
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
                            links={ADMIN_SIDEBAR_LINKS}
                        />
                    </div>

                    <div className="">
                        <Separator />
                        <Nav
                            isCollapsed={isCollapsed}
                            links={COMMON_SIDEBAR_LINKS}
                        />
                        <Separator />
                        <div className={cn(
                            "mt-2 flex justify-between gap-4",
                            isCollapsed && "flex-col justify-center items-center"
                        )}>
                            <UserAccountNav user={user} showName={!isCollapsed} />
                            <ThemeToggle />
                        </div>
                    </div>
                </TooltipProvider>
            </div>
            <Drawer>
                <DrawerTrigger className="bg-foreground rounded-sm md:hidden fixed right-5 top-5 z-50">
                    <Menu className="size-8 text-background" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="px-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4 justify-center items-center">
                            {ADMIN_SIDEBAR_LINKS.map((link) => (
                                <Link href={link.href} key={link.href}>
                                    <div className="flex items-center gap-2">
                                        <link.icon className="size-6" />
                                        <span>{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4 justify-center items-center">
                            {COMMON_SIDEBAR_LINKS.map((link) => (
                                <Link href={link.href} key={link.href}>
                                    <div className="flex items-center gap-2">
                                        <link.icon className="size-6" />
                                        <span>{link.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Separator />
                    </DrawerHeader>
                    <DrawerFooter>
                        <div className="flex justify-between gap-x-4">
                            <UserAccountNav user={user} showName={!isCollapsed} />
                            <ThemeToggle />
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}