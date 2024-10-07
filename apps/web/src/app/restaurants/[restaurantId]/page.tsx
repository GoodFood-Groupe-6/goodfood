"use client"

import RestaurantImage1 from "@/assets/images/restaurant1.jpg";
import RestaurantImage2 from "@/assets/images/restaurant2.jpg";
import RestaurantImage3 from "@/assets/images/restaurant1.jpg";
import RestaurantImage4 from "@/assets/images/restaurant2.jpg";
import RestaurantImage5 from "@/assets/images/restaurant1.jpg";
import ImageCarousel from '@/components/Restaurant/ImageCarouel';
import Tag from '@/components/Tag/Tag';
import { useState } from "react";
import CategoryButtons from "@/components/Category/CategoryButtons";
import ProductsCard from "@/components/Product/ProductsCard";
import BurgerImage from "@/assets/images/burger.png";
import PizzaImage from "@/assets/images/pizza.png";
import SandwichImage from "@/assets/images/sandwich.png";
import KebabImage from "@/assets/images/kebab.png";
import ProductsJson from "@/data/products.json";

const RestaurantPage = ({
    params
}: {
    params: {
        restaurantId: number,
    }
}) => {
    const images = [RestaurantImage1, RestaurantImage2, RestaurantImage3, RestaurantImage4, RestaurantImage5];
    const rating = '4.7';
    const deliveryCost = 'Free';
    const deliveryTime = '20 min';
    const categories = [
        {
            id: 1,
            title: 'Burger',
        },
        {
            id: 2,
            title: 'Sandwich',
        },
        {
            id: 3,
            title: 'Pizza',
        },
        {
            id: 4,
            title: 'Kebab',
        }
    ]
    const [activeButton, setActiveButton] = useState<number | null>(categories[0].id);

    const handleActiveButtonChange = (id: number | null) => {
        setActiveButton(id);
    }

    const products = ProductsJson.map(product => {
        if (product.image === 'BurgerImage') {
            return {
                ...product,
                image: BurgerImage,
            }
        } else if (product.image === 'PizzaImage') {
            return {
                ...product,
                image: PizzaImage,
            }
        } else if (product.image === 'SandwichImage') {
            return {
                ...product,
                image: SandwichImage,
            }
        } else if (product.image === 'KebabImage') {
            return {
                ...product,
                image: KebabImage,
            }
        }
    });

    const filteredProducts = products.filter(product => {
        if (product && product.categoryId === activeButton) {
            return product;
        }
        return null;
    });

    return (
        <div className='h-screen'>
            <ImageCarousel images={images} />
            <div className="p-6">
                <div className="flex items-center gap-6">
                    <Tag type='star' value={rating} bold={true} page='restaurant' />
                    <Tag type='delivery' value={deliveryCost} page='restaurant' />
                    <Tag type='clock' value={deliveryTime} page='restaurant' />
                </div>
                <div className="mt-4">
                    <h1 className="text-xl font-bold text-[#181c2e]">Spicy restaurant</h1>
                    <p className="mt-2 text-[#a0a5ba] text-sm">Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
                </div>
                <div className="mt-8">
                    <div className="flex gap-4 overflow-scroll no-scrollbar">
                        <CategoryButtons categories={categories} onActiveButtonChange={handleActiveButtonChange} />
                    </div>
                </div>
                <div className="mt-8">
                    <ProductsCard title={`${categories.find(category => category.id === activeButton)?.title || 'Product'} (${filteredProducts.length})`} products={filteredProducts} />
                </div>
            </div>
        </div>
    );
};

export default RestaurantPage;