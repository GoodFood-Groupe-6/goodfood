"use client"

import Link from "next/link"
import BackIcon from "../../assets/svg/back.svg"
import CartIcon from "../../assets/svg/cart.svg"
import DownArrowIcon from "../../assets/svg/down-arrow.svg"
import LeftArrowIcon from "../../assets/svg/left-arrow.svg"
import MenuIcon from "../../assets/svg/menu.svg"
import SelectDownIcon from "../../assets/svg/select-down.svg"
import FilterIcon from "../../assets/svg/filter.svg"
import Image from "next/image"
import { motion } from "framer-motion"
import Filter from "../Filtrer/Filter"
import { useState } from "react"
import CategoryListing from "../Category/CategoryListing"
import MoreIcon from "../../assets/svg/more.svg"

const Header = ({
    isSearchActive,
    closeSearch,
    headerType,
    category,
    backUrl,
}: {
    isSearchActive: boolean,
    closeSearch?: () => void,
    headerType?: string,
    category?: string,
    backUrl?: string,
}) => {
    const [selectedButtons, setSelectedButtons] = useState({ offers: "", deliveryTimes: "", pricing: "" })

    const buttonVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const textVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    if (headerType === 'cart') {
        return (
            <header className="flex justify-between items-center pt-1 px-6">
                <div className="flex gap-[18px]">
                    <Link href={backUrl || "/"}>
                        <div className='flex justify-center items-center w-[45px] h-[45px] bg-[#ECF0F4] rounded-full'>
                            <Image src={LeftArrowIcon} alt='left arrow icon' className='w-5' onClick={closeSearch} />
                        </div>
                    </Link>
                    <div className={`flex flex-col gap-[3px] justify-center`}>
                        <span className='text-[#181C2E] capitalize text-lg'>cart</span>
                    </div>
                </div>
                <Link href="/cart">
                    <div className='flex justify-center items-center'>
                        <span className='flex justify-center items-center text-[#FF7622] underline uppercase text-sm'>edit items</span>
                    </div>
                </Link>
            </header>
        )
    }

    if (headerType === 'category') {
        return (
            <header className="flex justify-between items-center pt-1 px-6">
                <div className="flex gap-[18px]">
                    <Link href={backUrl || "/"}>
                        <div className='flex justify-center items-center w-[45px] h-[45px] bg-[#ECF0F4] rounded-full'>
                            <Image src={BackIcon} alt='left arrow icon' />
                        </div>
                    </Link>
                    <CategoryListing />
                </div>
                <Filter setSelectedButtons={setSelectedButtons} />
            </header>
        )
    }

    if (headerType === 'restaurant') {
        return (
            <header className="flex justify-between items-center pt-1 px-6">
                <div className="flex gap-[18px]">
                    <Link href={backUrl || "/"}>
                        <div className='flex justify-center items-center w-[45px] h-[45px] bg-white rounded-full'>
                            <Image src={BackIcon} alt='left arrow icon' />
                        </div>
                    </Link>
                </div>
                <button className='flex justify-center items-center w-[45px] h-[45px] bg-white rounded-full relative'>
                    <Image src={MoreIcon} alt='more icon' />
                </button>
            </header>
        )
    }

    return (
        <header className='flex justify-between items-center pt-1 px-6'>
            <div className='flex gap-[18px]'>
                {!isSearchActive && (
                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex justify-center items-center w-[45px] h-[45px] bg-[#ECF0F4] rounded-full"
                    >
                        <Image src={MenuIcon} alt='menu icon' className='w-5' />
                    </motion.div>
                )}
                {isSearchActive && (
                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex justify-center items-center w-[45px] h-[45px] bg-[#ECF0F4] rounded-full"
                    >
                        <Image src={LeftArrowIcon} alt='left arrow icon' className='w-5' onClick={closeSearch} />
                    </motion.div>
                )}
                {!isSearchActive && (
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-[3px] ${isSearchActive ? 'justify-center' : ''}`}
                    >
                        <span className='text-[#FC6E2A] uppercase text-xs font-bold'>deliver to</span>
                        <span className='text-[#676767] text-sm flex gap-2'>
                            Halal Lab office
                            <Image src={DownArrowIcon} alt='down arrow icon' />
                        </span>
                    </motion.div>
                )}
                {isSearchActive && (
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-[3px] ${isSearchActive ? 'justify-center' : ''}`}
                    >
                        <span className='text-[#181C2E] capitalize text-lg'>search</span>
                    </motion.div>
                )}
            </div>
            <Link href="/cart">
                <div className='flex justify-center items-center w-[45px] h-[45px] bg-[#181C2E] rounded-full relative'>
                    <Image src={CartIcon} alt='cart icon' />
                    <span className='flex justify-center items-center bg-[#FF7622] w-[25px] h-[25px] rounded-full text-white absolute -top-1 right-0 inset'>2</span>
                </div>
            </Link>
        </header>
    )
}

export default Header