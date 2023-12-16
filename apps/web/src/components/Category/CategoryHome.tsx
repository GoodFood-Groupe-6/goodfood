import Link from "next/link"
import RightArrowIcon from "../../assets/svg/right-arrow.svg"
import Image from "next/image"
import PizzaImage from "../../assets/images/pizza.png"
import BurgerImage from "../../assets/images/burger.png"

const CategoryHome = () => {
    return (
        <div className='flex flex-col justify-between gap-[21px]'>
            <div className='flex justify-between pr-6'>
                <span className='text-[#32343E] text-xl capitalize'>all categories</span>
                <div className='flex gap-2.5 justify-between items-center'>
                    <Link href='/categories' className='text-[#333333] capitalize whitespace-nowrap'>see all</Link>
                    <Image src={RightArrowIcon} alt='right arrow' className='h-3' />
                </div>
            </div>
            <div className='flex gap-4 overflow-scroll no-scrollbar pr-6'>
                <div className='flex flex-col gap-3.5 items-center'>
                    <div className='h-[122px] w-[122px] bg-white rounded-2xl py-5 px-[13px] drop-shadow-lg'>
                        <Image src={PizzaImage} className='w-full h-full rounded-2xl' alt="image of pizza" />
                    </div>
                    <span className='text-[18px] font-bold capitalize'>Pizza</span>
                </div>
                <div className='flex flex-col gap-3.5 items-center'>
                    <div className='h-[122px] w-[122px] bg-white rounded-2xl py-5 px-[13px] drop-shadow-lg'>
                        <Image src={BurgerImage} className='w-full h-full rounded-2xl' alt="image of burger" />
                    </div>
                    <span className='text-[18px] font-bold capitalize'>Burger</span>
                </div>
                <div className='flex flex-col gap-3.5 items-center'>
                    <div className='h-[122px] w-[122px] bg-white rounded-2xl py-5 px-[13px] drop-shadow-lg'>
                        <Image src={PizzaImage} className='w-full h-full rounded-2xl' alt="image of pizza" />
                    </div>
                    <span className='text-[18px] font-bold capitalize'>Pizza</span>
                </div>
                <div className='flex flex-col gap-3.5 items-center'>
                    <div className='h-[122px] w-[122px] bg-white rounded-2xl py-5 px-[13px] drop-shadow-lg'>
                        <Image src={BurgerImage} className='w-full h-full rounded-2xl' alt="image of burger" />
                    </div>
                    <span className='text-[18px] font-bold capitalize'>Burger</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryHome