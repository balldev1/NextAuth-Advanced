import {CardWrapper} from "@/components/auth/card-wrapper";

export const LoginFrom = () =>{
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            Login Form
        </CardWrapper>
    )
}