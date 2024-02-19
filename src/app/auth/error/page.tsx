import { CardWrapper } from "@/components/auth/card-wrapper";
import ErrorCard from "@/components/auth/error-card";
import { FaExclamationTriangle } from "react-icons/fa";


export default function ErrorPage() {
    return (
        <div className="">
            <div className="parent-container w-1/2 mx-auto">
                <div className="w-[36rem] pt-36 pb-48 mx-auto">
                    <ErrorCard/>
                </div>
            </div>
        </div>
    )
}
