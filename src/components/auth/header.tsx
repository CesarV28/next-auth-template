import { FC } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
    label: string;
}
 
const Header: FC<HeaderProps> = ({ label }) => {
    return ( 
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            <h2 className={cn("font-semibold text-5xl p-4 text-center from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent")}>
                Auth
            </h2>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
     );
}
 
export default Header;