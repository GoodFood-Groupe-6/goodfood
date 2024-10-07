import SuggestedRestaurant from "./SuggestedRestaurant";

const SuggestedRestaurants = ({
    restaurants
}: {
    restaurants: {
        id: string,
        name: string,
        rating: string,
        imgUrl: string,
    }[],
}) => {
    return (
        <>
            <span className='text-[#32343E] text-xl capitalize'>suggested restaurants</span>
            <div className='mt-1.5'>
                {restaurants.map((restaurant) => (
                    <SuggestedRestaurant
                        key={restaurant.id}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        imgUrl={restaurant.imgUrl}
                    />
                ))}
            </div>
        </>
    );
}

export default SuggestedRestaurants