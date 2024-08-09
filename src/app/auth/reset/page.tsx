import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetForm } from "@/components/auth/reset-form";


export default function ResetPage() {
    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <ResetForm />

        </CardWrapper>
    )
}
