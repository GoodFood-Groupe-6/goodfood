import AuthContainer from "@/components/Auth/AuthContainer"
import Button from "@/components/Button/Button"
import FormInput from "@/components/Form/FormInput"
import FacebookIcon from "@/assets/svg/facebook.svg"
import TwitterIcon from "@/assets/svg/twitter.svg"
import AppleIcon from "@/assets/svg/apple.svg"
import Image from "next/image"
import Link from "next/link"

const Login = () => {
    return (
        <div>
            <AuthContainer pageTitle="Log In" pageDescription="Please sign in to your existing account">
                <form className="flex flex-col">
                    <FormInput value="" name="email" label="Email" type="email" placeholder="contact@test.com" />
                    <FormInput value="" name="password" label="Password" type="password" placeholder="********" />
                    <div className="flex justify-between items-center mt-2.5">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="mr-2.5 w-5 h-5" />
                            <label htmlFor="remember" className="text-sm font-normal text-[#7E8A97]">Remember me</label>
                        </div>
                        <a href="#" className="text-sm font-normal text-[#FF7622]">Forgot password</a>
                    </div>
                    <Button type="submit" className="mt-7">Log In</Button>
                </form>
                <div className="flex justify-center items-center mt-9">
                    <div className="flex flex-col items-center">
                        <div>
                            <span className="text-base font-normal text-[#646982]">Don&apos;t have an account?</span>
                            <Link href="/register" className="text-sm font-bold text-[#FF7622] ml-2.5 uppercase">Sign up</Link>
                        </div>
                        <span className="text-[#646982] text-base mt-7">Or</span>
                        <div className="flex gap-7 mt-4">
                            <button className="w-14 h-14 bg-[#F0F5FA] rounded-full flex justify-center items-center">
                                <Image src={FacebookIcon} alt="facebook icon" />
                            </button>
                            <button className="w-14 h-14 bg-[#F0F5FA] rounded-full flex justify-center items-center">
                                <Image src={TwitterIcon} alt="twitter icon" />
                            </button>
                            <button className="w-14 h-14 bg-[#F0F5FA] rounded-full flex justify-center items-center">
                                <Image src={AppleIcon} alt="apple icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </AuthContainer>
        </div>
    )
}

export default Login