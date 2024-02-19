import { FC } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";


interface TrobleButtonProps {

}

const TrobleButton: FC<TrobleButtonProps> = () => {
    return (
        <Button variant="outline" type="button">
            <HelpCircle className="w-4 h-4 mr-1" />
            Ask for Help
        </Button>
    );
}

export default TrobleButton;