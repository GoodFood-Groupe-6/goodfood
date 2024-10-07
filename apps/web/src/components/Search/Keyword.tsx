const Keyword = ({
    title
}: {
    title: string
}) => {
    return (
        <div className='border-2 border-[#EDEDED] rounded-full px-5 py-3'>
            <span className='text-[#181C2E] capitalize'>{title}</span>
        </div>
    );
}

export default Keyword