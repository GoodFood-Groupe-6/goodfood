import Image from "next/image"
import SearchIcon from "../../assets/svg/search.svg"
import RecentKeywords from "./RecentKeywords"
import SuggestedRestaurants from "../Restaurant/SuggestedRestaurants"

const Search = ({
    onInputChange,
    inputValue
}: {
    onInputChange: (text: string) => void,
    inputValue: string
}) => {
    return (
        <>
            <div className='relative pr-6'>
                <Image src={SearchIcon} alt='search icon' className='absolute left-5 inset-1/2 -translate-y-1/2' />
                <input type='text' className='bg-[#F6F6F6] w-full px-5 py-6 outline-0 rounded-lg text-[#676767] placeholder:text-[#676767] text-sm pl-[47px]' placeholder='Seach dishes, restaurants' onChange={(e) => onInputChange(e.target.value)} value={inputValue} />
            </div>

            {inputValue.length > 0 && (
                <>
                    <div className='mt-6'>
                        <RecentKeywords />
                    </div>

                    <div className='mt-8 pr-6'>
                        <SuggestedRestaurants />
                    </div>
                </>
            )}
        </>
    )
}

export default Search