import React, { useEffect, useMemo, useState } from "react";
import { MapPinIcon, CalendarIcon, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadScriptNext, Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";
import DateTimeOverlay from "./DateTimeOverlay"; // Import the custom DateTimeOverlay
import { getCurrentTime } from "../utils/DateFunction";

const NewRSB = () => {
    const [activeTab, setActiveTab] = useState("rent");
    const [placeInput, setPlaceInput] = useState("");
    const [place, setPlace] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [startDate, setStartDate] = useState(new Date(getCurrentTime()));
    const [endDate, setEndDate] = useState(null);
    const [tripDuration, setTripDuration] = useState("Select both dates");
    const [fade, setFade] = useState(false);
    const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
    const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

    const navigate = useNavigate();

    // Header text rotation
    const headerTexts = [
        "Smart rentals, easy driving",
        "Affordable rides for less",
        "Great deals, Smooth drives",
        "Drive more, Spend less",
        "Compare and save on rental",
    ];
    const [headerIndex, setHeaderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setHeaderIndex(
                    (prevIndex) => (prevIndex + 1) % headerTexts.length
                );
                setFade(false);
            }, 500);
        }, 3000);
        return () => clearInterval(interval);
    }, [headerTexts.length]);

    // Places API
    const placesAPILibraries = useMemo(() => ["places"], []);
    const placesAPIKey = import.meta.env.VITE_PLACES_API_KEY;

    const handlePlaceSelect = () => {
        if (autocomplete) {
            const placeDetails = autocomplete.getPlace();
            if (placeDetails.geometry) {
                const lat = placeDetails.geometry.location.lat();
                const lng = placeDetails.geometry.location.lng();
                setPlace({ name: placeDetails.name, lat, lng });

                const address = placeDetails.formatted_address.split(",");
                setAddress(
                    address.length > 2
                        ? `${address[0]}, ${address[1]}, ${address.at(-2)}`
                        : address
                );

                const cityComponent = placeDetails.address_components.find(
                    (component) => component.types.includes("locality")
                );
                setCity(cityComponent ? cityComponent.long_name : "");
            }
        }
    };

    // const handlePlacesAutocomplete = async () => {
    //     const locationInput = document.getElementById("location-input");
    //     const autocomplete = new google.maps.places.Autocomplete(locationInput, {
    //         types: ['geocode'],
    //     })
    //     console.log(autocomplete.getPredictions());
    // }

    // Calculate Trip Duration
    const calculateDuration = (currentStartDate, currentEndDate) => {
        const start = new Date(currentStartDate);
        const end = new Date(currentEndDate);

        if (isNaN(start) || isNaN(end)) {
            setTripDuration("Invalid Date");
            return;
        }

        const timeDifference = end - start;
        if (timeDifference < 0) {
            setTripDuration("0 Day(s) 0 Hour(s)");
            return;
        }

        const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;

        setTripDuration(`${days} Day(s) ${hours} Hour(s)`);
    };

    //   const handleStartDateChange = (date) => {
    //     setStartDate(date);
    //     if (endDate) calculateDuration(date, endDate);
    //   };

    //   const handleEndDateChange = (date) => {
    //     setEndDate(date);
    //     if (startDate) calculateDuration(startDate, date);
    //   };

    const handleSearch = () => {
        if (city && startDate && endDate) {
            const lat = place.lat;
            const lng = place.lng;
            const formattedCity =
                city === "Bengaluru" ? "bangalore" : city.toLowerCase();

            const stateData = {
                address,
                lat,
                lng,
                startDate,
                endDate,
                tripDuration,
            };

            navigate(`/self-drive-car-rentals/${formattedCity}/cars`, {
                state: stateData,
            });
        } else {
            toast.error("Required fields are empty", {
                position: "top-center",
                autoClose: 1000 * 5,
            });
        }
    };

    return (
        <>
            {/* Header */}
            <div className="bg-[#303030] rounded-full p-3 mx-auto mb-6 w-full max-w-md sm:w-[60%] md:max-w-xl lg:max-w-2xl">
                <h1
                    className={`text-white text-center text-md transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"
                        }`}
                >
                    <SparklesIcon className="inline-block w-5 h-5 mr-2 text-[#faffa4]" />
                    {headerTexts[headerIndex]}
                    <SparklesIcon className="inline-block w-5 h-5 ml-2 text-[#faffa4]" />
                </h1>
            </div>

            {/* Book Now Section */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-24 h-[1px] bg-gray-500"></div>
                    <h2 className="text-gray-400 font-normal">BOOK NOW</h2>
                    <div className="w-24 h-[1px] bg-gray-500"></div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-8 mb-6">
                    {["rent", "subscribe", "buy"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-lg ${activeTab === tab
                                ? "text-white border-b-2 border-gray-200"
                                : "text-gray-400"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4 mx-auto w-full max-w-[90%] md:max-w-[80%]">
                    {/* Location Input */}
                    <LoadScriptNext
                        googleMapsApiKey={placesAPIKey}
                        libraries={placesAPILibraries}
                    >
                        <div className="relative rounded-lg py-2 px-6 flex items-center border border-gray-500 w-full h-10">
                            <MapPinIcon className="w-6 h-5 text-gray-400 pr-1" />
                            <div className="flex-1">
                                <Autocomplete
                                    onLoad={setAutocomplete}
                                    onPlaceChanged={handlePlaceSelect}
                                    options={{
                                        componentRestrictions: {
                                            country: "IN",
                                        },
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        // value={placeInput}
                                        // onChange={(e) => setPlaceInput(e.target.value)}
                                        className="bg-transparent text-white outline-none w-full h-full"
                                        id="location-input"
                                    />
                                </Autocomplete>

                                {/* Get current location option */}
                                {/* {placeInput && (
                                    <ul className="absolute left-0 mt-1 w-full bg-gray-800 border border-gray-600 overflow-hidden">
                                    <li
                                        className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                                        onClick={handlePlacesAutocomplete}
                                    >
                                        📍 Get Current Location
                                    </li>
                                </ul>
                                )} */}
                            </div>
                        </div>
                    </LoadScriptNext>

                    {/* Start Date Picker */}
                    <div className="relative w-full">
                        <div
                            className="rounded-lg p-1 py-2 flex items-center relative cursor-pointer text-sm border border-gray-500 w-full h-10"
                            onClick={() => {
                                setIsStartPickerOpen(true);
                                setIsEndPickerOpen(false);
                            }}
                        >
                            <CalendarIcon className="w-6 h-4 text-gray-400 absolute left-4" />
                            <span className="text-gray-200 pl-10">
                                {startDate
                                    ? new Intl.DateTimeFormat("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }).format(new Date(startDate))
                                    : "Select Start Date"}
                            </span>
                        </div>
                        {isStartPickerOpen && (
                            <DateTimeOverlay
                                selectedDate={startDate}
                                setSelectedDate={setStartDate}
                                onSave={(value) => {
                                    setStartDate(value);
                                    if (endDate)
                                        calculateDuration(value, endDate);
                                    setIsStartPickerOpen(false);
                                }}
                                onClose={() => setIsStartPickerOpen(false)}
                            />
                        )}
                    </div>

                    {/* End Date Picker */}
                    <div className="relative w-full">
                        <div
                            className="rounded-lg p-1 flex items-center relative cursor-pointer text-sm border border-gray-500 w-full h-10"
                            onClick={() => {
                                setIsEndPickerOpen(true);
                                setIsStartPickerOpen(false);
                            }}
                        >
                            <CalendarIcon className="w-6 h-4 text-gray-400 absolute left-4" />
                            <span className="text-gray-200 pl-10">
                                {endDate
                                    ? new Intl.DateTimeFormat("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }).format(new Date(endDate))
                                    : "Select End Date"}
                            </span>
                        </div>
                        {isEndPickerOpen && (
                            <DateTimeOverlay
                                selectedDate={endDate || new Date()}
                                setSelectedDate={setEndDate}
                                onSave={(value) => {
                                    setEndDate(value);
                                    if (startDate)
                                        calculateDuration(startDate, value);
                                    setIsEndPickerOpen(false);
                                }}
                                onClose={() => setIsEndPickerOpen(false)}
                            />
                        )}
                    </div>
                </div>

                {/* Trip Duration */}
                <div className="bg-[#303030] rounded-lg p-2 mb-4 text-center mx-auto max-w-[90%] md:max-w-[50%]">
                    <div className="text-gray-400 text-sm">Trip Duration</div>
                    <div className="text-white text-lg">{tripDuration}</div>
                </div>

                {/* Search Button */}
                <div className="mx-auto max-w-[90%] md:max-w-[50%] mb-7">
                    <button
                        onClick={handleSearch}
                        className="w-full bg-[#faffa4] hover:bg-[#faffa8] text-black font-medium py-3 rounded-lg transition-colors"
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewRSB;
