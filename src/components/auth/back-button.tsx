import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";


interface BackButtonProps {
    href: string;
    label: string;
    className?: string;
}
 
export const BackButton: FC<BackButtonProps> = ({ href, label, className }) => {
    return ( 
        <Button
            variant="link"
            className={cn("font-normal w-full", className )}
            size="sm"
            asChild
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
     );
}
