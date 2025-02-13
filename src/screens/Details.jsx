import { useEffect, useState } from "react";
import {
    MapPin,
    Calendar,
    Car,
    Fuel,
    Joystick,
    Armchair,
    ArrowLeft,
} from "lucide-react";
import { auth } from "../utils/firebase";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import LoginPage from "../components/LoginPage"; // Import the LoginPage component

const CarDetails = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { formattedCity } = useParams();
    const encodedCarData = searchParams.get("car") || {};
    const rawParams = {
        car: JSON.parse(decodeURIComponent(encodedCarData)),
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
    };
    const { car, startDate, endDate } = rawParams;
    const startDateFormatted = new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const endDateFormatted = new Date(endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control modal visibility
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setAuthUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (authUser) {
            goToBooking();
        }
    }, [authUser]);

    const handleBooking = () => {
        if (!authUser) {
            setIsLoginModalOpen(true); // Open modal if not logged in
        } else {
            goToBooking();
        }
    };

    const goToBooking = () => {
        const userData = {
            uid: authUser.uid,
            name: authUser.displayName,
            email: authUser.email,
            phone: authUser.phoneNumber,
        };
        const encodedUserData = encodeURIComponent(JSON.stringify(userData));
        const queryParams = new URLSearchParams({
            startDate,
            endDate,
            userData: encodedUserData,
            car: encodedCarData,
        });
        navigate(`/booking/${formattedCity}?${queryParams}`);
    };

    const carDetails = [
        {
            name: `${car.brand} ${car.name}`,
            image: car.images[0],
            rating: car.ratingData.rating,
            features: [
                {
                    icon: <Armchair className="m-2 w-8 h-8" />,
                    label: "Seats",
                    value: car.options[2],
                },
                {
                    icon: <Car className="m-2 w-8 h-8" />,
                    label: "Trips",
                    value: car.trips,
                },
                {
                    icon: <Fuel className="m-2 w-9 h-9" />,
                    label: "Fuel Type",
                    value: car.options[1],
                },
                {
                    icon: <Joystick className="m-2 w-8 h-8" />,
                    label: "Transmission",
                    value: car.options[0],
                },
            ],
            bookingInfo: {
                city: formattedCity,
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                driveType: "Self Drive",
                logo: "/images/ServiceProvider/zoomcarlogo.png",
            },
            specifications: [
                { label: "Car Brand", value: car.brand },
                { label: "Car Name", value: car.name },
                { label: "Hourly Amount", value: car.hourly_amount },
                { label: "Seats", value: car.options[2] },
                { label: "Fuel Type", value: car.options[1] },
                { label: "Transmission", value: car.options[0] },
            ],
            price: car.fare,
        },
    ];

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className=" text-white m-3 mt-5 cursor-pointer"
            >
                <ArrowLeft size={25} />
            </button>
            <div className="min-h-screen bg-darkGrey text-white p-10 md:p-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {carDetails.map((car, index) => (
                        <>
                            {/* Left Section */}
                            <div key={`left-${index}`}>
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full rounded-2xl shadow-xl"
                                />
                                {/* Booking Information */}
                                <div className="bg-darkGrey2 mt-10 p-7 rounded-xl shadow-md mb-8 hidden lg:block">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Calendar />
                                                <p className="text-gray-400">
                                                    Start Date
                                                </p>
                                            </div>
                                            <p>{car.bookingInfo.startDate}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <MapPin />
                                                <p className="text-gray-400">
                                                    City
                                                </p>
                                            </div>
                                            <p>{car.bookingInfo.city}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex gap-2">
                                                <Calendar />
                                                <p className="text-gray-400">
                                                    End Date
                                                </p>
                                            </div>
                                            <p>{car.bookingInfo.endDate}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <p className="text-gray-400">
                                            Drive Type
                                        </p>
                                        <div className="flex items-center">
                                            <img
                                                src={car.bookingInfo.logo}
                                                alt="Zoomcar Logo"
                                                className="h-8"
                                            />
                                            <span className="ml-2">
                                                {car.bookingInfo.driveType}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div key={`right-${index}`}>
                                <h1 className="text-4xl font-bold mb-4">
                                    {car.name}
                                </h1>
                                <div className="flex items-center gap-2 text-appColor mb-6">
                                    <span className="text-xl font-semibold">
                                        ★ {car.rating}{" "}
                                    </span>
                                </div>

                                {/* Key Features */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {car.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-darkGrey2 rounded-xl p-4 gap-2 shadow-lg flex"
                                        >
                                            {feature.icon}
                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    {feature.label}
                                                </p>
                                                <p className="text-xl font-semibold">
                                                    {feature.value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Specifications */}
                                <h2 className="text-2xl font-bold mb-4">
                                    Specifications
                                </h2>
                                <ul className="space-y-2">
                                    {car.specifications.map((spec, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between"
                                        >
                                            <span className="text-gray-400">
                                                {spec.label}
                                            </span>
                                            <span>{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ))}
                </div>

                {/* Price and Booking */}
                <div className="mt-8 flex items-center justify-between lg:flex-col lg:space-y-4 lg:justify-center">
                    <p className="text-3xl font-semibold text-appColor">
                        {carDetails[0].price}
                    </p>
                    <button
                        onClick={handleBooking}
                        className="bg-appColor lg:w-48 text-black px-6 py-3 rounded-xl font-bold shadow-lg duration-300 ease-in-out transform hover:scale-110"
                    >
                        Book
                    </button>
                </div>
            </div>

            {/* Login Modal */}
            <LoginPage
                onAuth={setAuthUser}
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
};

export default CarDetails;
