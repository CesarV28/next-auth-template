"use client"

import { FC } from "react";
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface SocialProps {

}

export const Social: FC<SocialProps> = () => {

    const handdleClick = async (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>
            <div className="flex items-center w-full gap-x-2">
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => handdleClick("google")}
                >
                    <FcGoogle className="w-5 h-5" />
                </Button>
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline"
                    onClick={() => handdleClick("github")}
                >
                    <FaGithub className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
