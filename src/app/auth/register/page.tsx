import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  )
}
