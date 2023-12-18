const FilterButton = ({
    active,
    onClick,
    children,
    type,
}: {
    active?: boolean
    onClick?: () => void
    children: React.ReactNode,
    type?: string,
}) => {

    if (type === 'pricing') {
        return (
            <button
                className={`border-2 border-[#EDEDED] rounded-full w-14 h-14 active:bg-[#F58D1D] active:text-white active:border-[#F58D1D] transition-colors ${active ? 'bg-[#F58D1D] text-white border-[#F58D1D]' : ''}`}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

    return (
        <button
            className={`border-2 border-[#EDEDED] rounded-full pt-[14px] pb-[13px] pl-[17px] pr-[17px] active:bg-[#F58D1D] active:text-white active:border-[#F58D1D] transition-colors ${active ? 'bg-[#F58D1D] text-white border-[#F58D1D]' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default FilterButton