import AuthContainer from "@/components/Auth/AuthContainer"
import Button from "@/components/Button/Button"
import FormInput from "@/components/Form/FormInput"

const Register = () => {
    return (
        <div>
            <AuthContainer pageTitle="Sign Up" pageDescription="Please sign up to get started" allowBack={true}>
                <form className="flex flex-col justify-between h-full">
                    <div>
                        <FormInput value="" name="text" label="Name" type="text" placeholder="John doe" />
                        <FormInput value="" name="email" label="Email" type="email" placeholder="example@gmail.com" />
                        <FormInput value="" name="password" label="Password" type="password" placeholder="**********" />
                        <FormInput value="" name="password-confirmation" label="Re-type password" type="password" placeholder="**********" />
                    </div>
                    <Button type="submit" className="mt-7">Sign Up</Button>
                </form>
            </AuthContainer>
        </div>
    )
}

export default Register