import Image from "next/image";
import { motion } from 'framer-motion';
import SearchIcon from "../../assets/svg/search.svg";
import RecentKeywords from "./RecentKeywords";
import SuggestedRestaurants from "../Restaurant/SuggestedRestaurants";
import ProductsCard from "../Product/ProductsCard";
import BurgerImage from "../../assets/images/burger.png";

const searchVariants = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible: {
        opacity: 1,
        y: 0
    }
};

const Search = ({
    onInputChange,
    inputValue
}: {
    onInputChange: (text: string) => void,
    inputValue: string
}) => {

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

    const restaurants = [
        {
            id: '1',
            name: 'Rose Garden Restaurant',
            rating: '4.7',
            imgUrl: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg'
        },
        {
            id: '2',
            name: 'Cafenion Restaurant',
            rating: '4.3',
            imgUrl: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg'
        },
        {
            id: '3',
            name: 'Kaji Firm Kitchen',
            rating: '4.5',
            imgUrl: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg'
        },
        {
            id: '4',
            name: 'Kaba Restaurant',
            rating: '4.2',
            imgUrl: 'https://www.consofutur.com/wp-content/uploads/2017/09/nourriture_bio.jpg'
        },
    ];

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={searchVariants}
                transition={{ duration: 0.5 }}
                className='relative pr-6'
            >
                <Image src={SearchIcon} alt='search icon' className='absolute left-5 inset-1/2 -translate-y-1/2' />
                <input type='text' className='bg-[#F6F6F6] w-full px-5 py-6 outline-0 rounded-lg text-[#676767] placeholder:text-[#676767] text-sm pl-[47px]' placeholder='Seach dishes, restaurants' onChange={(e) => onInputChange(e.target.value)} value={inputValue} />
            </motion.div>

            {inputValue.length > 0 && (
                <>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={searchVariants}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mt-6'
                    >
                        <RecentKeywords />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={searchVariants}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='mt-8 pr-6'
                    >
                        <SuggestedRestaurants restaurants={restaurants} />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={searchVariants}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='mt-8 pr-6'
                    >
                        <ProductsCard title="Popular Products" products={products} />
                    </motion.div>
                </>
            )}
        </>
    )
}

export default Search;
