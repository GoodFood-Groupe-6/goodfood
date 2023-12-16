import Image from "next/image";
import StartIcon from "../../assets/svg/star.svg";

const SuggestedRestaurant = ({
    title,
    imgUrl
}: {
    title: string,
    imgUrl: string
}) => {
    return (
        <div className='flex gap-2.5 items-center py-3.5 border-b-2 border-b-[#EBEBEB]'>
            <div className={`w-[60px] h-[50px] min-h-[50px] min-w-[60px] bg-[#98A8B8] rounded-lg bg-cover`} style={{ backgroundImage: `url("${imgUrl}")` }}></div>
            <div className='flex flex-col gap-1'>
                <span className='text-[#32343E] capitalize'>{title}</span>
                <div className='flex gap-1 items-center'>
                    <Image src={StartIcon} alt='star icon' className='w-4 h-4' />
                    <span className='text-[#181C2E]'>4.7</span>
                </div>
            </div>
        </div>
    );
}

export default SuggestedRestaurant