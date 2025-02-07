import React from 'react';

const testimonials = [
    {
        quote: "Great app to compare best deals. It makes my renting experience so hassle free and the best part is I got rewards too. Easy to use and one stop destination for my renting needs.",
        name: "Anusha Dubey",
        stars: "⭐⭐⭐⭐⭐",
        imgSrc: "https://zymo.app/M1.webp", 
    },
    {
        quote: "I just booked my car through this app and found it really useful. This app allows you to plan small distance trips with reasonable rates. Also the support is very authentic and supportive.",
        name: "Shrivardhan",
        stars: "⭐⭐⭐⭐⭐",
        imgSrc: "https://zymo.app/M2.webp", 
    },
    {
        quote: "Amazing app and best platform for rental car requirements.. thank you",
        name: "Vinayak More",
        stars: "⭐⭐⭐⭐⭐",
        imgSrc: "https://zymo.app/F1.webp", 
    },
];

const Reviews = () => {
    return (
        <>
            <section className="text-white py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Our Customers Love Us</h2>
                    <p className="text-gray-400">We love hearing from happy customers</p>
                </div>
                <div className="flex justify-center gap-6 px-6 flex-wrap">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="border border-[#faffa4] p-6 rounded-lg w-[300px] md:w-[350px] text-center"
                        >
                            <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-3 mt-4">
                                <img src={testimonial.imgSrc} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                                <div className="text-left">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-[#faffa4] text-sm">{testimonial.stars}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Reviews;
