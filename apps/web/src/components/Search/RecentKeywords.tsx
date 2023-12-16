import Keyword from "./Keyword"

const Recentkeywords = () => {
    return (
        <div>
            <span className='text-[#32343E] text-xl capitalize'>recent keywords</span>

            <div className='flex gap-2.5 mt-3 overflow-scroll pr-6 no-scrollbar'>
                <Keyword title="burger" />
                <Keyword title="pizza" />
                <Keyword title="sandwich" />
                <Keyword title="kebab" />
                <Keyword title="tacos" />
            </div>
        </div>
    )
}

export default Recentkeywords