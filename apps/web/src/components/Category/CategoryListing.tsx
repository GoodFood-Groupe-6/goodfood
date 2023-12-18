"use client"

import Image from "next/image";
import SelectDownIcon from "../../assets/svg/select-down.svg";
import { useState } from "react";
import Link from "next/link";

const CategoryListing = () => {
    const [showCategory, setShowCategory] = useState(false)

    const toggleCategory = () => {
        setShowCategory(!showCategory)
    }

    const categories = [
        { id: 1, title: 'Burger' },
        { id: 2, title: 'Pizza' },
        { id: 3, title: 'Sushi' },
        { id: 4, title: 'Kebab' },
        { id: 5, title: 'Salad' },
        { id: 6, title: 'Drinks' },
    ];

    return (
        <div className="relative">
            <div className={`flex flex-col gap-[3px] justify-center`}>
                <div className={`${showCategory ? "border rounded-bl-0 rounded-br-0 rounded-tl-[22px] rounded-tr-[22px]" : "rounded-full"} flex justify-center gap-2 border border-[#ECF0F4] pt-3.5 pb-[13px] px-5`} onClick={toggleCategory}>
                    <span className="text-xs uppercase text-[#181C2E] font-bold">burger</span>
                    <Image src={SelectDownIcon} alt="select down icon" />
                </div>
            </div>
            {showCategory && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={toggleCategory}></div>
                    <div className="absolute top-7 left-0 w-full bg-white border border-t-0 border-[#ECF0F4] shadow-category-card py-2.5 px-5 flex flex-col gap-1 rounded-bl-[22px] rounded-br-[22px] z-10">
                        {categories.map(category => (
                            <div key={category.id} className="flex justify-between items-center">
                                <Link href={`/categories/${category.id}`} className="text-sm" onClick={toggleCategory}>
                                    <span className="text-[#646982]">{category.title}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CategoryListing;