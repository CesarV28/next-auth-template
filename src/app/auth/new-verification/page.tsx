

import { CardWrapper } from '@/components/auth/card-wrapper'
import NewVerificationForm from '@/components/auth/new-verification-form'


export default function NewVerificationPage() {
    return (
        <CardWrapper
            headerLabel='Confirm your verification'
            backButtonHref='/auth/login'
            backButtonLabel='Back to login'
            showSocial={false}
        >
            <NewVerificationForm />
        </CardWrapper>
    )
}
