import Image from "next/image";
import StarIcon from "../../assets/svg/star.svg";
import DeliveryIcon from "../../assets/svg/delivery.svg";
import ClockIcon from "../../assets/svg/clock.svg";

const Tag = ({
    value,
    type,
    bold,
    page,
}: {
    value: string,
    type: string,
    bold?: boolean
    page?: string,
}) => {
    let icon = '';
    let alt = '';
    switch (type) {
        case 'star':
            icon = StarIcon;
            alt = 'star icon';
            break;
        case 'delivery':
            icon = DeliveryIcon;
            alt = 'delivery icon';
            break;
        case 'clock':
            icon = ClockIcon;
            alt = 'clock icon';
            break;
        default:
            break;
    }
    return (
        <div className={`flex gap-1 ${page === 'restaurant' ? `gap-2.5`: ``}`}>
            <Image src={icon} alt={alt} />
            <span className={`text-[#181C2E] ${bold === true ? 'font-bold' : ''}`}>{value}</span>
        </div>
    )
}

export default Tag;