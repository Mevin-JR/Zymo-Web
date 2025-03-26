import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { findPackage } from "../utils/mychoize";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const BookingCard = ({ title }) => {
    const location = useLocation();
    const { startDate, endDate, car } = location.state || {};
    const { city } = useParams();

    const navigate = useNavigate();
    const goToDetails = (car, rateBasis) => {
        car.fare = `₹${car.rateBasisFare[rateBasis]}`
        car["rateBasis"] = rateBasis;
        navigate(`/self-drive-car-rentals/${city}/cars/booking-details`, {
            state: {
                startDate,
                endDate,
                car,
            },
        });
    };
    useEffect(() => {
        document.title = title;
      }, [title]);

    return (
        <>
            <Helmet>
                <title>Car Packages in {city} | Zymo</title>
                <meta name="description" content={`Explore car rental packages in ${city}. Choose the best self-drive rental deals with Zymo.`} />
                <meta property="og:title" content={title} />
        <meta property="og:description" content="Find the right package for your self-drive rental at the best prices." />
                <link rel="canonical" href={`https://zymo.app/self-drive-car-rentals/${city}/cars/packages`} />
            </Helmet>
            <button
                onClick={() => {
                    sessionStorage.setItem("fromSearch", false);
                    navigate(-1);
                }}
                className="text-white m-5 cursor-pointer"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="bg-[#212121] min-h-screen px-5 py-8 flex flex-col justify-center items-center">
                {Object.entries(car.total_km).map(([rateBasis, kms], index) => (
                    <div key={index} className="text-white flex flex-col items-center py-4 my-4 bg-[#303030] rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                        <div className="flex justify-between items-center w-full px-4 py-2">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-semibold flex items-center gap-2">
                                    Fulfilled by
                                    <span className="text-2xl text-[#E8FF81]">
                                        MyChoize
                                    </span>
                                    {/* <img
                                    className="w-20 h-6 rounded-md bg-cover"
                                    src=""
                                    alt="Fulfilled by"
                                /> */}
                                </h1>
                                <ul className="text-gray-200 space-y-1 mt-4">
                                    {car.options.map((option, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 text-md"
                                        >
                                            <span>• {option}</span>
                                        </li>
                                    ))}
                                    <li
                                        className="flex items-center gap-2 text-md"
                                    >
                                        <span>• {`Total KMs: ${kms}`}</span>
                                    </li>
                                    <li
                                        className="flex items-center gap-2 text-md"
                                    >
                                        <span>• {kms === "Unlimited KMs" ? `No extra KM charge` : `Extra KMs charged at ${car.extrakm_charge}`}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center space-y-1">
                                {/* <div className="flex items-center gap-1 text-gray-500 text-sm line-through">
                                    <span>{packageFare}</span>
                                </div> */}
                                <div className="text-xl font-bold text-white">
                                    {`₹${car.rateBasisFare[rateBasis]}`}
                                </div>
                                <div className="text-md text-[#E8FF81]">
                                    {findPackage(rateBasis)}
                                </div>
                                <button
                                    onClick={() => goToDetails(car, rateBasis)}
                                    className="bg-[#E8FF81] text-black font-bold text-md py-2 px-5 rounded-xl hover:bg-[#d7e46d] transition duration-300 ease-in-out">
                                    Go to booking
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 text-[#E8FF81] font-normal text-md py-2 px-5 border border-[#E8FF81] rounded-lg">
                            {/* {kms === "Unlimited KMs" ? `Unlimited KMs` : `Extra kms will be charged at ${car.extrakm_charge}`} */}
                            Home Delivery Available
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BookingCard;
