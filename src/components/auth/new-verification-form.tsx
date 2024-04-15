"use client"
import { FC, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/token.action";
import { LoaderIcon } from "lucide-react";


interface NewVerificationFormProps {

}

const NewVerificationForm: FC<NewVerificationFormProps> = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [verificationStatus, setVerificationStatus] = useState({
        status: "pending",
        message: "Your account is being verified"
    });

    

    const handleSubmit = useCallback(() => {
        if( 
            verificationStatus.status === "success" || 
            verificationStatus.status === "error" 
        ) return;

        if (!token) {
            setVerificationStatus({
                status: "error",
                message: "Opps!, we can not verify your account."
            });
            return;
        }

        newVerification(token).then((data) => {
            setVerificationStatus(data);
        }).catch((data) => {
            setVerificationStatus(data);
        });

    }, [token, verificationStatus]);

    useEffect(() => {
        handleSubmit();
    }, [handleSubmit])


    return (
        <div className="flex flex-col gap-4 items-center w-full justify-center">
            {verificationStatus.status === "pending" && (
                <LoaderIcon className="mr-2 animate-spin " />
            )}
            <div className="group relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <p

                    className="w-full relative rounded-lg bg-background px-7 py-4 text-foreground hover:bg-background"

                >
                    {verificationStatus.status === "pending" && <span>{verificationStatus.message}</span>}
                    {verificationStatus.status === "error" && <span>{verificationStatus.message}</span>}
                    {verificationStatus.status === "success" && <span>{verificationStatus.message}</span>}
                </p>
            </div>

        </div>
    );
}

export default NewVerificationForm;