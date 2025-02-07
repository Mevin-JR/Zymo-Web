import React from "react";

const benefits = [
    {
        imgSrc: "/images/Benefits/img-1.png",
        title: "Convenience",
    },
    {
        imgSrc: "/images/Benefits/img-2.png",
        title: "More Benefits",
    },
    {
        imgSrc: "/images/Benefits/img-3.png",
        title: "Cost Effective",
    },
];

const Benefits = () => {
    return (
        <>
            <section className="text-white py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Zymo Benefits</h2>
                </div>
                <div className="flex justify-center gap-8 px-6 flex-wrap bg-darkGrey">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className=" p-6 rounded-lg flex flex-col items-center w-[250px] md:w-[300px] text-center border border-[#faffa4]"
                        >
                            <img
                                src={benefit.imgSrc}
                                alt={benefit.title}
                                className="w-22 h-24 mb-4  "
                            />
                            <p className="text-[#faffa4] font-semibold">
                                {benefit.title}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Benefits;
