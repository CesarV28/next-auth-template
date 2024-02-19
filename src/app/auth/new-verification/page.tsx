

import { CardWrapper } from '@/components/auth/card-wrapper'
import NewVerificationForm from '@/components/auth/new-verification-form'


export default function NewVerificationPage() {
    return (
        <div className="w-full">
            <div className="parent-container w-1/2 mx-auto">
                <div className="w-[30rem] pt-36 pb-48 mx-auto">
                    <CardWrapper
                        headerLabel='Confirm your verification'
                        backButtonHref='/auth/login'
                        backButtonLabel='Back to login'
                        showSocial={false}
                    >
                        <NewVerificationForm />
                    </CardWrapper>
                </div>
            </div>
        </div>
    )
}
