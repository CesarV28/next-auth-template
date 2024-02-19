

import { CardWrapper } from '@/components/auth/card-wrapper'
import { NewPasswordForm } from '@/components/auth/new-password-form'


export default function NewVerificationPage() {
    return (
        <div className="w-full">
            <div className="parent-container w-1/2 mx-auto">
                <div className="w-[30rem] pt-36 pb-48 mx-auto">
                    <CardWrapper
                        headerLabel='Enter a new password'
                        backButtonHref='/auth/login'
                        backButtonLabel='Back to login'
                        showSocial={false}
                    >
                        <NewPasswordForm />
                    </CardWrapper>
                </div>
            </div>
        </div>
    )
}
