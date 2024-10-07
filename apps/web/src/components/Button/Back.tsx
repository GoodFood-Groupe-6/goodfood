import Image from 'next/image';
import BackIcon from '../../assets/svg/back.svg';
import Link from 'next/link';

type ButtonProps = {
    href: string;
    props?: any;
};

const Back: React.FC<ButtonProps> = ({ href, ...props }) => {
    return <Link href={href} className="bg-white rounded-full w-11 h-11 flex items-center justify-center lg:hidden" {...props}>
        <Image src={BackIcon} alt="back icon" className='' />
    </Link>;
};

export default Back;
