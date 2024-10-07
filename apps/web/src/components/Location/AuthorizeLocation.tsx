import Button from "../Button/Button"
import LocationIcon from "../../assets/svg/location.svg"
import Image from "next/image"

const AuthorizeLocation = () => {
    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-white flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="bg-[#98A8B8] w-52 h-64 rounded-3xl"></div>
            <Button className="mt-24 text-base lg:w-64">Access location</Button>
            <span className="text-[#646982] text-base uppercase text-center mt-9 lg:w-1/4">goodfood will access your location only while using the app</span>
        </div>
    )
}

export default AuthorizeLocation