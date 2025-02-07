import React from "react";
import { FaCar, FaGasPump, FaLock, FaRoad } from "react-icons/fa"; // Import icons
import { useLocation, useNavigate } from "react-router-dom";

const BookingCard = () => {
    const location = useLocation();
    const { car, city, startDate, endDate } = location.state || {};

    const features = ["Fuel not included", "Self Pickup"];
    car.options.map((option) => features.push(option));

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-[#212121] min-h-screen px-5 py-8 flex justify-center items-center">
                <div className="text-white flex flex-col items-center py-4 my-4 bg-[#303030] rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                    <div className="flex justify-between items-center w-full px-4 py-2">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-semibold flex items-center gap-2">
                                {/* TODO: Change this later */}
                                Fulfilled by
                                <span className="text-2xl text-[#E8FF81]">
                                    Zoomcar
                                </span>
                                {/* <img
                                    className="w-20 h-6 rounded-md bg-cover"
                                    src=""
                                    alt="Fulfilled by"
                                /> */}
                            </h1>
                            <ul className="text-gray-200 space-y-1 mt-4">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-md"
                                    >
                                        <span>• {feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <div className="flex items-center gap-1 text-gray-500 text-sm line-through">
                                <span>{car.actual_fare}</span>
                            </div>
                            <div className="text-xl font-bold text-white">
                                {car.fare}
                            </div>
                            <button className="bg-[#E8FF81] text-black font-bold text-md py-2 px-5 rounded-xl hover:bg-[#d7e46d] transition duration-300 ease-in-out">
                                Go to summary
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-2">
                        <button className="text-[#E8FF81] font-normal text-md py-2 px-5 border border-[#E8FF81] rounded-lg">
                            Zero Security Deposit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingCard;
