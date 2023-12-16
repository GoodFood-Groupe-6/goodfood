import Link from "next/link";
import RightArrowIcon from "../../assets/svg/right-arrow.svg"
import StarIcon from "../../assets/svg/star.svg"
import DeliveryIcon from "../../assets/svg/delivery.svg"
import ClockIcon from "../../assets/svg/clock.svg"
import Image from "next/image";

const RestaurantHome = () => {
    return (
        <div className='flex flex-col justify-between gap-5'>
            <div className='flex justify-between'>
                <span className='text-[#32343E] text-xl capitalize'>open restaurants</span>
                <div className='flex gap-2.5 justify-between items-center'>
                    <Link href='/categories' className='text-[#333333] capitalize whitespace-nowrap'>see all</Link>
                    <Image src={RightArrowIcon} alt='right arrow' className='h-3' />
                </div>
            </div>
            <div className='flex flex-col gap-7'>
                <div className='flex flex-col'>
                    <div className='w-full h-32 bg-[#98A8B8] rounded-xl bg-[url("https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg")] bg-cover bg-center'></div>
                    <span className='text-d text-xl mt-2'>Rose Garden Restaurant</span>
                    <span className='text-[#A0A5BA] text-sm'>Burger - Chiken - Riche - Wings</span>
                    <div className='flex mt-2.5 items-center gap-6'>
                        <div className='flex gap-1'>
                            <Image src={StarIcon} alt='star icon' />
                            <span className='text-[#181C2E] font-bold'>4.7</span>
                        </div>
                        <div className='flex gap-1'>
                            <Image src={DeliveryIcon} alt='delivery icon' />
                            <span className='text-[#181C2E]'>Free</span>
                        </div>
                        <div className='flex gap-1'>
                            <Image src={ClockIcon} alt='clock icon' />
                            <span className='text-[#181C2E]'>20 min</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='w-full h-32 bg-[#98A8B8] rounded-xl bg-[url("https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg")] bg-cover bg-center'></div>
                    <span className='text-d text-xl mt-2'>Rose Garden Restaurant</span>
                    <span className='text-[#A0A5BA] text-sm'>Burger - Chiken - Riche - Wings</span>
                    <div className='flex mt-2.5 items-center gap-6'>
                        <div className='flex gap-1'>
                            <Image src={StarIcon} alt='star icon' />
                            <span className='text-[#181C2E] font-bold'>4.7</span>
                        </div>
                        <div className='flex gap-1'>
                            <Image src={DeliveryIcon} alt='delivery icon' />
                            <span className='text-[#181C2E]'>Free</span>
                        </div>
                        <div className='flex gap-1'>
                            <Image src={ClockIcon} alt='clock icon' />
                            <span className='text-[#181C2E]'>20 min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantHome