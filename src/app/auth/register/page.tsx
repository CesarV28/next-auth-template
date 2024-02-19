import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {

  return (
    <div className="w-full">
      <div className="parent-container w-1/2 mx-auto">
        <div className="w-[30rem] pt-24 pb-48 mx-auto">
          <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
          >
            <RegisterForm />
          </CardWrapper>
        </div>
      </div>
    </div>
  )
}
