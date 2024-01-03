import Image, { StaticImageData } from "next/image";

const CategoryCard = ({
    pizzaImage,
    name,
}: {
    pizzaImage: StaticImageData
    name: string,
}) => {
    return (
        <div className='flex flex-col gap-3.5 items-center'>
            <div className='h-[122px] w-[122px] lg:w-44 lg:h-44 bg-white rounded-2xl py-5 px-[13px] drop-shadow-lg'>
                <Image src={pizzaImage} className='w-full h-full rounded-2xl' alt="image of pizza" />
            </div>
            <span className='text-[18px] font-bold capitalize lg:text-xl'>{name}</span>
        </div>
    )
}

export default CategoryCard;