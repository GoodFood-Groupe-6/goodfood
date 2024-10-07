"use client"

import AuthContainer from "@/components/Auth/AuthContainer"
import Button from "@/components/Button/Button"
import FormInput from "@/components/Form/FormInput"
import VerificationCode from "@/components/Form/VerificationCode"
import { useState } from "react"

const ForgotPassword = () => {

    const [isCodeSent, setIsCodeSent] = useState(false)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsCodeSent(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleCodeChange = (e: string) => {
        setCode(e)

        if (e.length === 4) {
            console.log("submit")
        }
    }

    return (
        <div>
            <AuthContainer pageTitle="Forgot Password" pageDescription="Please sign in to your existing account" pageEmail={isCodeSent === true ? email : ''} allowBack={true}>
                {isCodeSent === true ? (
                    <div>
                        <form>
                            <VerificationCode value={code} onChange={handleCodeChange} />
                            <Button type="submit" className="mt-1.5">Verify</Button>
                        </form>
                    </div>
                ) : (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <FormInput value={email} name="email" label="Email" type="email" placeholder="example@gmail.com" onChange={handleChange} />
                        <Button type="submit" className="mt-1.5">Send code</Button>
                    </form>
                )}
            </AuthContainer>
        </div>
    )
}

export default ForgotPassword