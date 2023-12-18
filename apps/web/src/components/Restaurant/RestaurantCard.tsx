import Image from "next/image";
import StarIcon from "../../assets/svg/star.svg"
import DeliveryIcon from "../../assets/svg/delivery.svg"
import ClockIcon from "../../assets/svg/clock.svg"

const RestaurantCard = ({
    name,
    tags,
    rating,
    deliveryCost,
    deliveryTime,
}: {
    name: string,
    tags?: string,
    rating: string,
    deliveryCost: string,
    deliveryTime: string,
}) => {
    return (
        <div className='flex flex-col'>
            <div className='w-full h-32 bg-[#98A8B8] rounded-xl bg-[url("https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg")] bg-cover bg-center'></div>
            <span className='text-d text-xl mt-2'>{name}</span>
            <span className='text-[#A0A5BA] text-sm'>{tags}</span>
            <div className='flex mt-2.5 items-center gap-6'>
                <div className='flex gap-1'>
                    <Image src={StarIcon} alt='star icon' />
                    <span className='text-[#181C2E] font-bold'>{rating}</span>
                </div>
                <div className='flex gap-1'>
                    <Image src={DeliveryIcon} alt='delivery icon' />
                    <span className='text-[#181C2E]'>{deliveryCost}</span>
                </div>
                <div className='flex gap-1'>
                    <Image src={ClockIcon} alt='clock icon' />
                    <span className='text-[#181C2E]'>{deliveryTime}</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard;