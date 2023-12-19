import Image from "next/image";
import StarIcon from "../../assets/svg/star.svg"
import DeliveryIcon from "../../assets/svg/delivery.svg"
import ClockIcon from "../../assets/svg/clock.svg"
import Tag from "../Tag/Tag";

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
                <Tag type='star' value={rating} bold={true} />
                <Tag type='delivery' value={deliveryCost} />
                <Tag type='clock' value={deliveryTime} />
            </div>
        </div>
    )
}

export default RestaurantCard;