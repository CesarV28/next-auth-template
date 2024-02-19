import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {


    return (
        <div className="w-full">
            <div className="parent-container w-1/2 mx-auto">
                <div className="w-[30rem] pt-36 pb-48 mx-auto">
                    <CardWrapper
                        headerLabel="Welcome back"
                        backButtonLabel="Do not have an account"
                        backButtonHref="/auth/register"
                        showSocial
                    >
                        <LoginForm />

                    </CardWrapper>

                </div>
            </div>
        </div>
    )
}
