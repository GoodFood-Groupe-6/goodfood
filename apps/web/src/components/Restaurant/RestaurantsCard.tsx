import Link from "next/link";
import RightArrowIcon from "../../assets/svg/right-arrow.svg"
import Image from "next/image";
import RestaurantCard from "./RestaurantCard";

const RestaurantsCard = ({
    restaurants,
    seeAll,
}: {
    restaurants: {
        id: string,
        name: string,
        tags?: string,
        rating: string,
        deliveryCost: string,
        deliveryTime: string,
    }[],
    seeAll?: boolean,
}) => {
    return (
        <div className='flex flex-col justify-between gap-5'>
            <div className='flex justify-between'>
                <span className='text-[#32343E] text-xl capitalize'>open restaurants</span>
                {seeAll && (
                    <div className='flex gap-2.5 justify-between items-center'>
                        <Link href='/categories' className='text-[#333333] capitalize whitespace-nowrap'>see all</Link>
                        <Image src={RightArrowIcon} alt='right arrow' className='h-3' />
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-7'>
                {restaurants.map((restaurant) => (
                    <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                        <RestaurantCard
                            name={restaurant.name}
                            tags={restaurant.tags}
                            rating={restaurant.rating}
                            deliveryCost={restaurant.deliveryCost}
                            deliveryTime={restaurant.deliveryTime}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RestaurantsCard;