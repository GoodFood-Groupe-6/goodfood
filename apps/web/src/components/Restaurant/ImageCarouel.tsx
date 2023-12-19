"use client"

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";

const ImageCarousel = ({
    images
}: {
    images: StaticImageData[],
}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const prevImageRef = useRef(currentImage);

    useEffect(() => {
        prevImageRef.current = currentImage;
    }, [currentImage]);

    const selectImage = (index: number) => {
        setCurrentImage(index);
    };

    return (
        <div className="relative">
            <motion.div
                key={currentImage}
                initial={{ x: currentImage > prevImageRef.current ? 200 : -200 }}
                animate={{ x: 0, transition: { duration: 0.2 } }}
            >
                <Image src={images[currentImage]} alt="restaurant" className="max-h-80 h-80 w-full object-cover brightness-90 rounded-b-3xl" />
            </motion.div>
            <div className="py-6 absolute top-0 w-full">
                <Header isSearchActive={false} headerType="restaurant" />
            </div>
            <div className="flex absolute bottom-6 -translate-x-1/2 left-1/2 gap-3 items-center">
                {images.map((image, index) => (
                    <div key={index} className={`w-3 h-3 rounded-full cursor-pointer ${currentImage === index ? 'border-2 border-white' : 'bg-white opacity-80'}`} onClick={() => selectImage(index)}></div>
                ))}
            </div>
        </div>
    )
}

export default ImageCarousel;