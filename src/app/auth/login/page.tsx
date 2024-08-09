import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {


    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Do not have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <LoginForm />

        </CardWrapper>
    )
}
