"use client"

import { useState, useEffect } from "react";
import FilterButton from "../Filtrer/FilterButton";

const CategoryButtons = ({
    categories,
    onActiveButtonChange,
}: {
    categories: {
        id: number,
        title: string,
    }[],
    onActiveButtonChange: (id: number | null) => void,
}) => {
    const [activeButton, setActiveButton] = useState<number | null>(categories[0]?.id || null);

    useEffect(() => {
        onActiveButtonChange(activeButton);
    }, [activeButton, onActiveButtonChange]);

    const handleClick = (id: number) => {
        setActiveButton(id);
        onActiveButtonChange(id);
    }

    return (
        <>
            {categories.map(category => (
                <FilterButton key={category.id} active={category.id === activeButton} onClick={() => handleClick(category.id)}>
                    <span>{category.title}</span>
                </FilterButton>
            ))}
        </>
    )
}

export default CategoryButtons;