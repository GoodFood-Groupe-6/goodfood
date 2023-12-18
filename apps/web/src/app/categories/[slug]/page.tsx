"use client"

import Header from "@/components/Header/Header"
import ProductCard from "@/components/Product/ProductCard"
import BurgerImage from "@/assets/images/burger.png"
import RestaurantsCard from "@/components/Restaurant/RestaurantsCard"
import ProductsCard from "@/components/Product/ProductsCard"

const Page = ({ params }: { params: { slug: string } }) => {

    const restaurants = [
        {
            id: '1',
            name: 'Rose Garden Restaurant',
            tags: 'Burger - Chiken - Riche - Wings',
            rating: '4.7',
            deliveryCost: 'Free',
            deliveryTime: '20 min',
        },
        {
            id: '2',
            name: 'Cafenion Restaurant',
            tags: 'Burger - Chiken - Riche - Wings',
            rating: '4.7',
            deliveryCost: 'Free',
            deliveryTime: '20 min',
        },
        {
            id: '3',
            name: 'Kaji Firm Kitchen',
            tags: 'Burger - Chiken - Riche - Wings',
            rating: '4.7',
            deliveryCost: 'Free',
            deliveryTime: '20 min',
        },
        {
            id: '4',
            name: 'Kaba Restaurant',
            tags: 'Burger - Chiken - Riche - Wings',
            rating: '4.7',
            deliveryCost: 'Free',
            deliveryTime: '20 min',
        },
    ];

    const products = [
        {
            id: '1',
            title: 'Burger',
            restaurant: 'Rose Garden Restaurant',
            price: '10.00',
            image: BurgerImage,
        },
        {
            id: '2',
            title: 'Burger',
            restaurant: 'Rose Garden Restaurant',
            price: '10.00',
            image: BurgerImage,
        },
        {
            id: '3',
            title: 'Burger',
            restaurant: 'Rose Garden Restaurant',
            price: '10.00',
            image: BurgerImage,
        },
        {
            id: '4',
            title: 'Burger',
            restaurant: 'Rose Garden Restaurant',
            price: '10.00',
            image: BurgerImage,
        },
    ];

    return (
        <div className='h-screen'>
            <div className="py-6">
                <Header isSearchActive={false} headerType="category" />
            </div>
            <div className='px-6'>
                <ProductsCard title="Popular Burgers" products={products} />
                <div className="mt-8">
                    <RestaurantsCard restaurants={restaurants} />
                </div>
            </div>
        </div>
    )
}

export default Page