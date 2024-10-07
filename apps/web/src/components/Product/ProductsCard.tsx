"use client"

import { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductsCard = ({
    title,
    products,
}: {
    title: string;
    products: {
        id: number;
        title: string;
        restaurant?: string;
        price: string;
        image: StaticImageData
    }[];
}) => {
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <div className='flex flex-col justify-between gap-6'>
            <div className='flex justify-between pr-6'>
                <span className='text-[#32343E] text-xl capitalize'>{title}</span>
            </div>
            <div className='grid gap-4 grid-cols-2'>
                <AnimatePresence>
                    {products.map((product) => (
                        <motion.div 
                            key={product.id}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.1 }}
                        >
                            <ProductCard
                                title={product.title}
                                restaurant={product.restaurant || ''}
                                price={product.price}
                                image={product.image}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProductsCard;