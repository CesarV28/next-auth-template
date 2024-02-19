import { FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Header from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import TrobleButton from "./trouble-button";



interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial: boolean;
}

export const CardWrapper: FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Header label={headerLabel} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter className="flex flex-col gap-6">
                <BackButton
                    href={backButtonHref}
                    label={backButtonLabel}
                />
            </CardFooter>


        </Card>

    );
}

