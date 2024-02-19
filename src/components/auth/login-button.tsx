"use client"

import { useRouter } from "next/navigation";
import { FC } from "react";


interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean
}
 
const LoginButton: FC<LoginButtonProps> = ({ children, mode, asChild }) => {

    const router = useRouter();

    const handleClick = async () => {
        router.push("/auth/login")
    }

    if(mode === "modal") {
        return (
            <span>
                TODO
            </span>
        )
    }

    return ( 
        <span onClick={ handleClick } className="cursor-pointer">
            { children }
        </span>
     );
}
 
export default LoginButton;