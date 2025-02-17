import React, { useState, useEffect, useRef } from "react";

const benefits = [
    { title: "Wide Range of Cars" },
    { title: "Quick and Easy Booking" },
    { title: "No Hidden Charges" },
    { title: "Trusted by 100,000+ Happy Customers" },
];

const Benefits = () => {
    const [visibleBoxes, setVisibleBoxes] = useState(Array(benefits.length).fill(false));
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleBoxes((prev) => prev.map(() => true));
                }
            },
            { threshold: 0.3 } 
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="text-white py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Zymo Benefits</h2>
            </div>
            <div className="flex justify-center gap-8 px-6 flex-wrap bg-darkGrey">
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg flex flex-col justify-center items-center w-[250px] md:w-[300px] text-center border border-[#faffa4] h-[150px] 
                        transition-all duration-700 ease-in-out transform ${
                            visibleBoxes[index] ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${index * 1000}ms` }} 
                    >
                        <p className={`text-[#faffa4] text-1xl font-bold transition-opacity duration-700 ease-in-out ${visibleBoxes[index] ? "opacity-100" : "opacity-0"}`}>
                            {benefit.title}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;
