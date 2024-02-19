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
import { BackButton } from "@/components/auth/back-button";
import { FaExclamationTriangle } from "react-icons/fa";



interface ErrorCardProps {

}

const ErrorCard: FC<ErrorCardProps> = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Header label="Oops!, Something went wrong" />
                </CardTitle>
                <CardDescription className="text-center">There was a unexpected problem, try again or contact support service</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full flex justify-center items-center">
                    <FaExclamationTriangle className="text-destructive w-16 h-16" />
                </div>
            </CardContent>
            <CardFooter>
                <BackButton
                    href="/auth/login"
                    label="Back to login"
                    className="w-full text-xl"
                />
            </CardFooter>
        </Card>
    );
}

export default ErrorCard;