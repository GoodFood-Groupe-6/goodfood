const CategoryButton = ({
    onClick,
    active,
    children
}: {
    onClick?: () => void,
    active?: boolean,
    children: React.ReactNode,

}) => {
    return (
        <button
            className={`border-2 border-[#EDEDED] rounded-full pt-[14px] pb-[13px] pl-[17px] pr-[17px] active:bg-[#F58D1D] active:text-white active:border-[#F58D1D] transition-colors ${active ? 'bg-[#F58D1D] text-white border-[#F58D1D]' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}