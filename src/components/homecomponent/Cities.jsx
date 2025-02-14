import React from "react";
import { useNavigate } from "react-router-dom";

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
    const handleCityClick = (city) => {
        window.history.pushState(
            {},
            "",
            `/self-drive-car-rentals/${city.toLowerCase()}`
        ); // Updates the URL without navigating

        const input = document.getElementById("location-input");
        if (input) {
            input.value = city;
        }
    };

    return (
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
    );
};

export default Cities;
