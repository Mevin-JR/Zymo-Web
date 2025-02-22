import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BookingCard = () => {
    const location = useLocation();
    const { startDate, endDate, car } = location.state || {};
    const { city } = useParams();

    const findPackage = (packageFare) => {
        const key = Object.keys(car.rateBasisFare).find(k => car.rateBasisFare[k] === packageFare);
        if (key === "FF") {
            return "120km/day";
        } else if (key === "MP") {
            return "300km/day";
        } else if (key === "DR") {
            return "Unlimited Kms";
        } else {
            return "Undefined"
        }
    }

    const navigate = useNavigate();
    const goToDetails = (car) => {
        navigate(`/self-drive-car-rentals/${city}/cars/booking-details`, {
            state: {
                startDate,
                endDate,
                car,
            },
        });
    };

    return (
        <>
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
                {Object.entries(car.total_km).map(([rateBasis, kms]) => (
                    <div className="text-white flex flex-col items-center py-4 my-4 bg-[#303030] rounded-lg shadow-lg max-w-2xl w-full mx-auto">
                        <div className="flex justify-between items-center w-full px-4 py-2">
                            <div className="flex flex-col">
                                <h1 className="text-xl font-semibold flex items-center gap-2">
                                    {/* TODO: Change this later */}
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
                                    <li
                                        className="flex items-center gap-2 text-md"
                                    >
                                        <span>• {`Total Kms: ${kms}`}</span>
                                    </li>
                                    {car.options.map((option) => (
                                        <li
                                            className="flex items-center gap-2 text-md"
                                        >
                                            <span>• {option}</span>
                                        </li>
                                    ))}
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
                                    {findPackage(car.rateBasisFare[rateBasis])}
                                </div>
                                <button
                                    onClick={() => goToDetails(car)}
                                    className="bg-[#E8FF81] text-black font-bold text-md py-2 px-5 rounded-xl hover:bg-[#d7e46d] transition duration-300 ease-in-out">
                                    Go to booking
                                </button>
                            </div>
                        </div>
                        <div className="text-[#E8FF81] font-normal text-md py-2 px-5 border border-[#E8FF81] rounded-lg">
                            {`${car.extrakm_charge}`}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BookingCard;
