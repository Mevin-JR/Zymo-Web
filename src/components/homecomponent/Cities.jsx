import React from "react";

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
    return (
        <section className=" text-black py-10">
            <div className="bg-[#faffa4] mx-auto p-6 rounded-lg max-w-6xl">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Service Available In Cities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                    {cities.map((column, colIndex) => (
                        <div key={colIndex}>
                            {column.map((city, index) => (
                                <span
                                    key={index}
                                    className="block text-sm text-black"
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cities;
