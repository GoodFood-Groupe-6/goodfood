import { StaticImageData } from "next/image";
import ProductCard from "./ProductCard";

const ProductsCard = ({
    title,
    products,
}: {
    title: string;
    products: {
        id: string;
        title: string;
        restaurant: string;
        price: string;
        image: StaticImageData
    }[];
}) => {
    return (
        <div className='flex flex-col justify-between gap-6'>
            <div className='flex justify-between pr-6'>
                <span className='text-[#32343E] text-xl capitalize'>{title}</span>
            </div>
            <div className='grid gap-4 grid-cols-2'>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        restaurant={product.restaurant}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsCard;