import React, { useState, useEffect } from "react";

const HeroImage = () => {
    const images = [
        "/images/HeroImages/carimg-1.jpg",
        "/images/HeroImages/carimg-2.jpg",
        "/images/HeroImages/carimg-3.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-[100%] max-w-5xl mx-auto overflow-hidden rounded-lg z-10 ">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((carimg, index) => (
                    <img
                        key={index}
                        src={carimg}
                        alt={`Hero section ${index + 1}`}
                        className="w-full h-auto flex-shrink-0 object-cover rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroImage;
