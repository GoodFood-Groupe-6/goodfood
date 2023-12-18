"use client"

import Image from "next/image"
import { useState } from "react"
import CloseIcon from "../../assets/svg/close.svg"
import FilterIcon from "../../assets/svg/filter.svg"
import FilterButton from "./FilterButton"
import Button from "../Button/Button"
import { AnimatePresence, motion } from "framer-motion"

const Filter = ({
    setSelectedButtons,
}: {
    setSelectedButtons: React.Dispatch<React.SetStateAction<{ offers: string; deliveryTimes: string; pricing: string; }>>
}) => {
    const [isFilterActive, setIsFilterActive] = useState(false)
    const [activeButtons, setActiveButtons] = useState({ offers: "", deliveryTimes: "", pricing: "" })

    const toggleFilter = () => {
        setIsFilterActive(!isFilterActive)
    }

    const toggleButton = (group: string, button: string) => {
        setActiveButtons(prev => {
            const newActiveButtons = { ...prev, [group]: prev[group as keyof typeof prev] === button ? "" : button }
            setSelectedButtons(newActiveButtons)
            return newActiveButtons
        })
    }

    const offers = [
        { title: 'Delivery', value: 'delivery' },
        { title: 'Pick Up', value: 'pickup' },
        { title: 'Offer', value: 'offer' },
        { title: 'Online payment available', value: 'payment' }
    ];
    const deliveryTimes = [
        { title: '10-15 min', value: '10-15' },
        { title: '20 min', value: '20' },
        { title: '30 min', value: '30' }
    ];
    const pricing = [
        { title: '$', value: '1' },
        { title: '$$', value: '2' },
        { title: '$$$', value: '3' }
    ];

    return (
        <div>
            <button className='flex justify-center items-center w-[45px] h-[45px] bg-[#ECF0F4] rounded-full relative' onClick={toggleFilter}>
                <Image src={FilterIcon} alt='filter icon' />
            </button>
            <AnimatePresence mode="wait">
                {isFilterActive === true && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="absolute top-0 left-0 bg-[#273F55AB] h-full w-full z-20" onClick={toggleFilter}></div>
                        <div className='absolute top-[80px] bottom-[80px] right-4 left-4 bg-white rounded-2xl z-20'>
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[17px]">Filter your search</span>
                                        <button className="bg-[#ECF0F4] rounded-full w-[45px] h-[45px] flex items-center justify-center" onClick={toggleFilter}>
                                            <Image src={CloseIcon} alt='close icon' />
                                        </button>
                                    </div>
                                    <div className="mt-7">
                                        <span className="uppercase text-[13px]">offers</span>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            {offers.map(offer => (
                                                <FilterButton key={offer.value} active={activeButtons.offers === offer.value} onClick={() => toggleButton('offers', offer.value)}>
                                                    <span>{offer.title}</span>
                                                </FilterButton>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-7">
                                        <span className="uppercase text-[13px]">delivery time</span>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            {deliveryTimes.map(time => (
                                                <FilterButton key={time.value} active={activeButtons.deliveryTimes === time.value} onClick={() => toggleButton('deliveryTimes', time.value)}>
                                                    <span>{time.title}</span>
                                                </FilterButton>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-7">
                                        <span className="uppercase text-[13px]">pricing</span>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            {pricing.map(price => (
                                                <FilterButton key={price.value} type="pricing" active={activeButtons.pricing === price.value} onClick={() => toggleButton('pricing', price.value)}>
                                                    <span>{price.title}</span>
                                                </FilterButton>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button>
                                    <span>filter</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Filter