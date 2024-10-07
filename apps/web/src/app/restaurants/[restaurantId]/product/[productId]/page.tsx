import ImageCarousel from "@/components/Restaurant/ImageCarouel";
import Tag from "@/components/Tag/Tag";
import RestaurantImage1 from "@/assets/images/restaurant1.jpg";

const ProductPage = ({
    params
}: {
    params: {
        restaurantId: number,
        productId: number
    }
}) => {
    console.log(params);
    const images = [RestaurantImage1];

    return (
        <div className='h-screen'>
            <ImageCarousel images={images} displayDots={false} />
            <div className="p-6">
                <div className="flex items-center gap-6">
                    fef
                </div>
                <div className="mt-4">
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
