import Image, { StaticImageData } from "next/image";
import ProductCardButton from "../Button/ProductCardButton";

const ProductCard = ({
    title,
    restaurant,
    image,
    price,
}: {
    title: string;
    restaurant: string;
    image: StaticImageData;
    price: string;
}) => {
    return (
        <div className="w-full">
            <Image src={image} className="relative object-contain max-h-28 bottom-4 w-11/12 top-0 -translate-x-1/2 left-1/2 rounded-xl z-0" alt="product image" />
            <div className="bg-white rounded-2xl shadow-product-card p-2.5 w-full flex flex-col gap-1 pt-14 -mt-14">
                <span className="text-[#32343E] font-bold text-base">{title}</span>
                <span className="text-[#646982] text-xs">{restaurant}</span>
                <div className="flex justify-between">
                    <span className="text-[#32343E] font-bold text-base">{price}</span>
                    <ProductCardButton />
                </div>
            </div>
        </div>

    )
}

export default ProductCard;