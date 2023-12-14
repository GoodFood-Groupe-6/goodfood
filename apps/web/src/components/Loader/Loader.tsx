"use client"

import Image from 'next/image'
import logo from '../../assets/svg/logo.svg'
import LoaderTopLeft from '../../assets/svg/loader-top-left.svg'
import LoaderBottomRight from '../../assets/svg/loader-bottom-right.svg'

const Loader = () => {
    return (
        <div className="bg-white w-screen h-screen absolute top-0 left-0">
            <div className="flex justify-center items-center w-full h-full">
                <Image src={logo} alt='logo' className='w-40' />
            </div>

            <div className="absolute top-0 left-0">
                <Image src={LoaderTopLeft} alt='loader top left' />
            </div>
            <div className="absolute bottom-0 right-0">
                <Image src={LoaderBottomRight} alt='loader bottom right' />
            </div>
        </div>
    )
}

export default Loader