import SuggestedRestaurant from "./SuggestedRestaurant";

const SuggestedRestaurants = () => {
    return (
        <div>
            <span className='text-[#32343E] text-xl capitalize'>suggested restaurants</span>

            <div className='mt-1.5'>
                <SuggestedRestaurant title="pansi restaurant" imgUrl="https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg" />
                <SuggestedRestaurant title="american spicy burger shop" imgUrl="https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg" />
                <SuggestedRestaurant title="cafenio coffee club" imgUrl="https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg" />
            </div>
        </div>
    );
}

export default SuggestedRestaurants