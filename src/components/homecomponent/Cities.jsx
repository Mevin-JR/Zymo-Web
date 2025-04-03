import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const cities = [
    [
        "Bangalore",
        "Hyderabad",
        "Mumbai",
        "Delhi",
        "Chennai",
        "Pune",
        "Mangalore",
        "Dombivili",
        "Palava",
        "Thane",
        "Amritsar",
    ],
    [
        "Kolkata",
        "Ahmedabad",
        "Bhubaneswar",
        "Chandigarh",
        "Coimbatore",
        "Jaipur",
        "Kochi",
        "Nashik",
        "Madurai",
        "Ghaziabad",
        "Merrut",
    ],
    [
        "Goa",
        "Lucknow",
        "Bhopal",
        "Guwahati",
        "Indore",
        "Cochin",
        "Mysore",
        "Modinagar",
        "Muradnagar",
        "Gurugram",
        "Noida",
    ],
    [
        "Nagpur",
        "Siliguri",
        "Trichy",
        "Vadodara",
        "Vijaywada",
        "Vizag",
        "Udupi",
        "Vishakapatnam",
        "Udaipur",
        "Jodhpur",
        "Haridwar",
        "Rishikesh",
    ],
];

const Cities = () => {
    const { city } = useParams();
    const navigate = useNavigate();

    const handleCityClick = (city) => {
        navigate(`/self-drive-car-rentals/${city.toLowerCase()}`); // Navigate properly
    };


    return (
        <>
            <Helmet>
                <title>{`Explore Self-Drive Car Rentals in ${String(city)} | Zymo`}</title>
                <meta
                    name="description"
                    content={`Discover self-drive car rentals in ${String(city)}. Choose from a range of cars and book hassle-free!`}
                />
                <meta property="og:title" content={`Self-Drive Car Rentals in ${String(city)} | Zymo`} />
                <meta
                    property="og:description"
                    content={`Find the best self-drive car rental services in ${String(city)}. Choose your preferred car and start your journey!`}
                />
                <link
                    rel="canonical"
                    href={`https://zymo.app/self-drive-cars-in/${String(city)}`}
                />
            </Helmet>


            <section className="text-black py-10">
                <div className="bg-[#faffa4] mx-auto p-6 rounded-lg max-w-6xl">
                    <h2 className="text-xl font-bold mb-4 text-center">
                        Service Available In Cities
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                        {cities.map((column, colIndex) => (
                            <div key={colIndex}>
                                {column.map((city, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCityClick(city)}
                                        className="block text-black hover:text-gray-700 transition duration-300 cursor-pointer"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cities;
