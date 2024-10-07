import Image from "next/image";
import StarIcon from "../../assets/svg/star.svg";
import Tag from "../Tag/Tag";

const SuggestedRestaurant = ({
    title,
    rating,
    imgUrl,
}: {
    title: string,
    rating: string,
    imgUrl: string
}) => {
    return (
        <div className='flex gap-2.5 items-center py-3.5 border-b-2 border-b-[#EBEBEB]'>
            <div className={`w-[60px] h-[50px] min-h-[50px] min-w-[60px] bg-[#98A8B8] rounded-lg bg-cover`} style={{ backgroundImage: `url("${imgUrl}")` }}></div>
            <div className='flex flex-col gap-1'>
                <span className='text-[#32343E] capitalize'>{title}</span>
                <Tag type='star' value={rating} />
            </div>
        </div>
    );
}

export default SuggestedRestaurant