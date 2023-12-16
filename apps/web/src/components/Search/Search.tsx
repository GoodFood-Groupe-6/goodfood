import Image from "next/image";
import { motion } from 'framer-motion';
import SearchIcon from "../../assets/svg/search.svg";
import RecentKeywords from "./RecentKeywords";
import SuggestedRestaurants from "../Restaurant/SuggestedRestaurants";

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
                        <SuggestedRestaurants />
                    </motion.div>
                </>
            )}
        </>
    )
}

export default Search;
