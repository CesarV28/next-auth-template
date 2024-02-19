import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetForm } from "@/components/auth/reset-form";


export default function ResetPage() {
    return (
        <div className="w-full">
            <div className="parent-container w-1/2 mx-auto">
                <div className="w-[30rem] pt-36 pb-48 mx-auto">
                    <CardWrapper
                        headerLabel="Forgot your password?"
                        backButtonLabel="Back to login"
                        backButtonHref="/auth/login"
                        showSocial={false}
                    >
                        <ResetForm/>

                    </CardWrapper>

                </div>
            </div>
        </div>
    )
}
