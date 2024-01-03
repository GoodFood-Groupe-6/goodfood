import Link from "next/link"
import RightArrowIcon from "../../assets/svg/right-arrow.svg"
import Image from "next/image"
import PizzaImage from "../../assets/images/pizza.png"
import BurgerImage from "../../assets/images/burger.png"
import CategoryCard from "./CategoryCard"

const CategoryHome = () => {

    const categories = [
        { id: 1, name: 'Burger', image: BurgerImage },
        { id: 2, name: 'Pizza', image: PizzaImage },
        { id: 3, name: 'Sushi', image: BurgerImage },
        { id: 4, name: 'Kebab', image: PizzaImage },
    ];

    return (
        <div className='flex flex-col justify-between gap-[21px]'>
            <div className='flex justify-between pr-6'>
                <span className='text-[#32343E] text-xl capitalize lg:text-3xl'>all categories</span>
                <div className='flex gap-2.5 justify-between items-center'>
                    <Link href='/categories' className='text-[#333333] capitalize whitespace-nowrap lg:text-xl'>see all</Link>
                    <Image src={RightArrowIcon} alt='right arrow' className='h-3' />
                </div>
            </div>
            <div className='flex gap-4 overflow-scroll no-scrollbar pr-6'>
                {categories.map(category => (
                    <CategoryCard key={category.id} name={category.name} pizzaImage={category.image} />
                ))}
            </div>
        </div>
    )
}

export default CategoryHome