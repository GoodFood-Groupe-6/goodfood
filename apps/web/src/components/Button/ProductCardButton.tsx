import PlusIcon from '../../assets/svg/plus.svg';
import Image from 'next/image';

const ProductCardButton = () => {
    return (
        <button className='flex justify-center items-center w-7 h-7 bg-[#F58D1D] rounded-full'>
            <Image src={PlusIcon} alt='plus icon' />
        </button>
    )
}

export default ProductCardButton;