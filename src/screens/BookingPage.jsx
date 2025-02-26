import { ArrowLeft, MapPin, Calendar, IndianRupee, Car } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ConfirmPage from "../components/ConfirmPage";
import { formatDate, formatDateForMyChoize, formatFare, toPascalCase } from "../utils/helperFunctions";
import { findPackage ,createBooking  as createMyChoizeBooking } from "../utils/mychoize";
import { doc, getDoc } from "firebase/firestore";
import { appDB } from "../utils/firebase";

// Function to dynamically load Razorpay script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function BookingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { city } = useParams();
    const { startDate, endDate, userData, car ,activeTab} = location.state || {};

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate)

    const [customerName, setCustomerName] = useState(userData.name);
    const [customerPhone, setCustomerPhone] = useState(userData.phone);
    const [customerEmail, setCustomerEmail] = useState(userData.email);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [vendorDetails, setVendorDetails] = useState(null);

    const functionsUrl = import.meta.env.VITE_FUNCTIONS_API_URL;
    // const functionsUrl = "http://127.0.0.1:5001/zymo-prod/us-central1/api";

    useEffect(() => {
        console.log(userData);
        console.log(car);
        const vendor = car.source === "zoomcar" ? "ZoomCar" : car.source === "mychoize" ? "Mychoize" : car.source;
        const fetchVendorDetails = async () => {
            const docRef = doc(appDB, "carvendors", vendor);
            const docSnap = await getDoc(docRef);

            setVendorDetails(docSnap.data());
        }

        fetchVendorDetails();
    }, [car.source]);

    const calcGST = (fare) => {
        const rawFare = parseInt(fare.slice(1));
        const gstPercent = parseFloat(vendorDetails?.TaxSd);
        return parseFloat(rawFare * gstPercent);
    }

    const calcDiscount = (fare) => {
        const rawFare = parseInt(fare.slice(1));
        const discountPrecent = 1 - parseFloat(vendorDetails?.DiscountSd);
        return parseFloat(rawFare * discountPrecent);
    }

    const calcPayableAmount = (fare) => {
        const rawFare = parseInt(fare.slice(1));
        const gst = calcGST(fare) === rawFare ? 0 : calcGST(fare);
        const deposit = parseInt(vendorDetails?.Securitydeposit);
        const discount = calcDiscount(fare);
        return (rawFare + gst + deposit) - discount;
    }

    const formattedFare = formatFare(car.fare);

    const bookingData = {
        headerDetails: {
            name: `${car.brand} ${car.name}`,
            type: car.options.slice(0, 3).join(" | "),
            range: `${findPackage(car.rateBasis)}`,
            image: car.images[0],
        },
        pickup: {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            city: city,
        },
        carDetails: {
            registration: vendorDetails?.plateColor || "N/A",
            package: activeTab === "subscribe" ? "Subscription" : car.rateBasis === "DR" ? "Unlimited KMs" :
             findPackag(car.rateBasis),
            transmission: car.options[0],
            fuel: car.options[1],
            seats: car.options[2],
        },
        fareDetails: {
            base: car.actual_fare ? car.actual_fare : formattedFare,
            fare: formattedFare,
            gst: car.source === "zoomcar" ? "Included in Base Fare" : formatFare(calcGST(car.fare)),
            deposit: car.source === "zoomcar" ? "₹0" : formatFare(vendorDetails?.Securitydeposit),
            discount: formatFare(calcDiscount(car.fare)),
            payable_amount: formatFare(calcPayableAmount(car.fare)),
        },
        customer: {
            name: userData.name === null ? "N/A" : userData.name,
            mobile: userData.phone === null ? "N/A" : userData.phone,
            email: userData.email === null ? "N/A" : userData.email,
        },
        voucher: {
            amount: 75,
        },
    };

    const createBooking = async (paymentData) => {
        const startDateEpoc = Date.parse(startDate);
        const endDateEpoc = Date.parse(endDate);
    
        if (car.source === "mychoize") {
            try {
                const bookingDetails = {
                PickDate: formatDateForMyChoize(startDate),
                DropDate: formatDateForMyChoize(endDate),
                PickRegionKey : car.locationKey,
                RentalType:'D',
                
                BrandGroundLength: car.brandGroundLength,
                BrandKey: car.brandKey,
                BrandLength: car.brandLength,
                DropRegionKey: car.locationKey,
                FuelType: car.fuelType,
                GroupKey: car.GroupKey,
                LocationKey: car.locationKey,
                LuggageCapacity: car.luggageCapacity,
                RFTEngineCapacity: car.rtfEngineCapacity,
                SeatingCapacity: car.seatingCapacity,
                TariffKey: car.tariffKey,
                TransmissionType: car.transmissionType,
                VTRHybridFlag: car.vtrHybridFlag,
                VTRSUVFlag: car.vtrSUVFlag,
                SecurityToken:"",                    
                };
    
                const data = await createMyChoizeBooking(bookingDetails);
                
                if (data.error) {
                    toast.error("Booking creation failed, Please try again later...", {
                        position: "top-center",
                        autoClose: 1000 * 3,
                    });
                    return;
                }
    
                toast.info("Booking process started...", {
                    position: "top-center",
                    autoClose: 1000 * 3,
                });
    
                // Handle success, if needed
                console.log("MyChoize Booking Created:", data);
    
            } catch (error) {
                console.error("Error in MyChoize booking:", error);
                toast.error("An error occurred while booking, please try again...", {
                    position: "top-center",
                    autoClose: 1000 * 5,
                });
            }
        } else {
            // Existing ZoomCar booking process
            const response = await fetch(`${functionsUrl}/zoomcar/bookings/create-booking`, {
                method: "POST",
                body: JSON.stringify({
                    customer: {
                        uid: userData.uid,
                        name: customerName,
                        phone: customerPhone,
                        email: customerEmail,
                    },
                    booking_params: {
                        type: "normal",
                        cargroup_id: car.cargroup_id,
                        car_id: car.id,
                        city: city,
                        search_location_id: car.location_id,
                        ends: endDateEpoc,
                        fuel_included: false,
                        lat: car.lat,
                        lng: car.lng,
                        pricing_id: car.pricing_id,
                        starts: startDateEpoc,
                    },
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                toast.error("Booking creation failed, Please try again later...", {
                    position: "top-center",
                    autoClose: 1000 * 3,
                });
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            if (data.status !== 1) {
                const msg = data.msg ? data.msg : "Something went wrong...";
                toast.error(msg, {
                    position: "top-center",
                    autoClose: 1000 * 5,
                });
                return;
            }
    
            toast.info("Booking process started...", {
                position: "top-center",
                autoClose: 1000 * 3,
            });
    
            const bookingId = data.booking.confirmation_key;
            const amount = data.booking.fare.total_amount;
    
            updateBookingPayment(bookingId, amount, paymentData);
        }
    };
    

    const updateBookingPayment = async (bookingId, amount, paymentData) => {
        let retry = 0;

        const response = await fetch(`${functionsUrl}/zoomcar/payments`, {
            method: "POST",
            body: JSON.stringify({
                customer: {
                    uid: userData.uid,
                    name: customerName,
                    phone: customerPhone,
                    email: customerEmail,
                },
                city: city,
                bookingData: {
                    booking_id: bookingId,
                    amount: amount,
                },
                payment_data: paymentData,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (retry <= 2) {
                retry += 1;
                updateBookingPayment(bookingId, amount, paymentData);
                return;
            }

            toast.error("Payment confirmation failed...", {
                position: "top-center",
                autoClose: 1000 * 5,
            });
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();
        // TODO: Handle this
    };

    //Create order
    const createOrder = async (amount, currency) => {
        try {
            const response = await axios.post(
                `${functionsUrl}/payment/create-order`,
                {
                    amount,
                    currency,
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Error creating payment", {
                position: "top-center",
                autoClose: 1000 * 5,
            });
            throw error;
        }
    };

    const initiateRefund = async (payment_id) => {
        try {
            const response = await axios.post(
                `${functionsUrl}/payment/refund`,
                {
                    payment_id,
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error refunding order:", error);
            toast.error(`Error initiating refund: ${error.message}`, {
                position: "top-center",
                autoClose: 1000 * 5,
            });
        }
    };

    const handleCustomerDetails = () => {
        if (!customerName || !customerEmail || !customerPhone) {
            toast.warn("Please fill the customer details....", {
                position: "top-center",
                autoClose: 1000 * 3,
            });
            return false;
        }

        if (customerPhone.length !== 10 || isNaN(customerPhone)) {
            toast.warn("Invalid phone number", {
                position: "top-center",
                autoClose: 1000 * 3,
            });
            return false;
        }
        setCustomerPhone(`+91${customerPhone}`);
        return true;
    };

    const handlePayment = async () => {
        if (!handleCustomerDetails()) {
            return;
        }
        await delay(1000);
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            console.error("Razorpay SDK failed to load!");
            toast.error("Could not load razorpay, Please try again later...", {
                position: "top-center",
                autoClose: 1000 * 5,
            });
            return;
        }

        try {
            const amount = parseInt(car.fare.slice(1));
            const orderData = await createOrder(amount, "INR");
            const options = {
                key: import.meta.env.VITE_RAZORPAY_TEST_KEY,
                amount: orderData.amount,
                currency: "INR",
                name: "Zymo",
                description: "title",
                image: "/images/AppLogo/zymo2.jpg",
                order_id: orderData.id,
                handler: async function (response) {
                    const data = {
                        ...response,
                    };
                    const res = await axios.post(
                        `${functionsUrl}/payment/verifyPayment`,
                        data
                    );

                    // Payment successful
                    if (res.data.success) {
                        // setIsConfirmPopupOpen(true);
                        // Create booking
                        createBooking(data).catch((error) => {
                            console.error("Booking error:", error);
                            console.log(
                                "Initiating refund due to booking failure"
                            );
                            initiateRefund(data.razorpay_payment_id).then(
                                (refundResponse) => {
                                    if (refundResponse.status === "processed") {
                                        navigate("/");
                                        toast.success(
                                            "A refund has been processed, please check your mail for more details",
                                            {
                                                position: "top-center",
                                                autoClose: 1000 * 10,
                                            }
                                        );
                                    }
                                }
                            );
                        });
                    } else {
                        toast.error("Payment error, Please try again...", {
                            position: "top-center",
                            autoClose: 1000 * 5,
                        });
                    }
                },
                theme: {
                    color: "#000",
                    backdrop_color: "#000",
                },
                prefill: {
                    name: userData.name,
                    email: userData.email,
                    contact: userData.phone,
                },
            };

            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", async function (response) {
                console.log("Payment failed:", response.error);
                console.log(response.error.metadata.order_id);
                console.log(response.error.metadata.payment_id);
            });

            rzp1.on("payment.error", function (response) {
                console.log("Payment error:", response.error);
            });

            rzp1.open();
        } catch (error) {
            console.error("Error during payment initiation:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#212121]">
            {/* Header */}
            <div className="bg-[#eeff87] p-4 flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-black/10 rounded-full"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className=" text-3xl font-bold  flex-grow text-center">
                    Confirm Booking
                </h1>
            </div>

            {/* Main Content */}
            <div className="mx-auto p-6 sm:p-10 lg:p-20 space-y-5 text-white">
                {/* Header Details */}
                <div className="flex flex-wrap justify-between items-center gap-5 rounded-lg p-6 shadow-sm w-full">
                    <div className="flex-1 min-w-[200px] text-xl">
                        <h2 className="font-semibold mb-2">
                            {bookingData.headerDetails.name}
                        </h2>
                        {/* <p className="text-[18px] text-gray-400 mb-1">
                            {bookingData.headerDetails.type}
                        </p>
                        <p className="text-[18px] text-gray-400">
                            {bookingData.headerDetails.range}
                        </p> */}
                    </div>

                    <div className="flex-1 flex justify-center -mt-10">
                        <img
                            src={
                                bookingData.headerDetails.image ||
                                "/placeholder.svg"
                            }
                            alt={`${bookingData.headerDetails.name}`}
                            className="w-full sm:w-96 lg:w-80 h-[200px] sm:h-[280px] lg:h-[200px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1 flex justify-end items-end gap-1 text-xl">
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-muted-foreground whitespace-nowrap">
                                Fulfilled by:{" "}
                                <img
                                    src={car.sourceImg}
                                    alt={car.source}
                                    className="h-10"
                                />
                            </p>
                        </div>
                    </div>
                </div>


                {/* Pickup Details */}
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
                    <h3 className="text-center mb-3 text-white text-3xl font-bold">
                        Pickup
                    </h3>
                    <hr className="my-1 mb-5 border-gray-500" />
                    <div className="space-y-2">
                        {/* Pickup Location */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#eeff87]" />
                                <p>Pickup City</p>
                            </div>
                            <p className="ml-auto text-gray-300">{toPascalCase(bookingData.pickup.city)}</p>
                        </div>

                        {/* Start Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>Start Date</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.pickup.startDate}
                            </p>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>End Date</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.pickup.endDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Car Details */}
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Car Details
                    </h3>
                    <hr className="my-1 mb-5 border-gray-500" />
                    <div className="space-y-2">
                        {/* Registeration */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Registeration</p>
                            </div>
                            <p className="ml-auto text-gray-300">{bookingData.carDetails.registration}</p>
                        </div>

                        {/* Package */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Package</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.carDetails.package}
                            </p>
                        </div>

                        {/* Transmission */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Transmission</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.carDetails.transmission}
                            </p>
                        </div>

                        {/* Fuel */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Fuel Type</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.carDetails.fuel}
                            </p>
                        </div>

                        {/* Seats */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Seats</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.carDetails.seats}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Customer Details */}
                {/* <div className="max-w-3xl mx-auto rounded-lg">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Customer Details
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-[#eeff87]" />
                                <p>Name:</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.customer.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-[#eeff87]" />
                                <p>Mobile No:</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.customer.mobile}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-[#eeff87]" />
                                <p>Email Id:</p>
                            </div>
                            <p className="ml-auto text-gray-300">
                                {bookingData.customer.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fare Details */}
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Fare Details
                    </h3>
                    <hr className="my-1 mb-5 border-gray-500" />
                    <div className="space-y-2">
                        {/* Base Fare */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Base Fare</span>
                            </div>
                            <span className="ml-auto text-gray-300">
                                {bookingData.fareDetails.base}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>GST {car.source !== "zoomcar" ? `(${(vendorDetails?.TaxSd * 100).toFixed(0)}%)` : ""}</span>
                            </div>
                            <span className="ml-auto text-gray-300">
                                {bookingData.fareDetails.gst}
                            </span>
                        </div>

                        {/* Refundable Deposit */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Security Deposit</span>
                            </div>
                            <span className="ml-auto text-gray-300">
                                {bookingData.fareDetails.deposit}
                            </span>
                        </div>

                        {/* Discount */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Discount {`(${((1 - vendorDetails?.DiscountSd) * 100).toFixed(0)}%)`}</span>
                            </div>
                            <span className="ml-auto text-gray-300">
                                {`- ${bookingData.fareDetails.discount}`}
                            </span>
                        </div>

                        <hr className="my-0 border-gray-600" />

                        {/* Payable Amount */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Payable Amount</span>
                            </div>
                            <span className="ml-auto text-[#eeff87]">
                                {bookingData.fareDetails.payable_amount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Voucher Notice */}
                {/* <div className="text-center">
                    <p className="bg-zinc-900 text-white p-4 rounded-lg inline-block">
                        On Completion of this order, you will receive a voucher
                        of ₹{bookingData.voucher.amount}
                    </p>
                </div> */}

                {/* Promo Code */}
                {/* <div className="space-y-3 w-fit">
                    <h3 className="text-white text-3xl font-bold text-center ">
                        Apply Promo Code
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            className="flex-1 border rounded-lg px-4 py-2 bg-zinc-900"
                        />
                        <button className=" text-black px-6 py-2 rounded-lg font-medium bg-[#eeff87] hover:bg-[#e2ff5d] transition-colors">
                            Apply
                        </button>
                    </div>
                </div> */}

                {/* Voucher Selection */}
                {/* <div className="bg-zinc-900 text-white p-4 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <img
                                src="path-to-your-image.jpg"
                                alt="Voucher"
                                className="w-8 h-8 rounded-full"
                            />
                            <span>Select a voucher</span>
                        </div>
                        <span className="text-red-800 cursor-pointer">
                            View Voucher
                        </span>
                    </div> */}

                {/* Customer Input Fields */}
                
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
                    <h3 className="text-center mb-1 text-white text-3xl font-bold">
                        Customer Details
                    </h3>
                    {car.source !== "zoomcar" ? (
                        <p className="text-center text-gray-400 text-sm mb-4">
                            (You must add your details and documents to continue)
                        </p>
                    ) : ""}
                    <hr className="my-1 mb-5 border-gray-500" />
                    {car.source === "zoomcar" ? (
                        <div className="space-y-4">
                            {/* Name Input */}
                            <div className="flex flex-col">
                                <label className="text-lg text-[#eeff87]">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) =>
                                        setCustomerName(e.target.value)
                                    }
                                    className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Phone Input */}
                            <div className="flex flex-col">
                                <label className="text-lg text-[#eeff87]">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    value={customerPhone}
                                    onChange={(e) =>
                                        setCustomerPhone(e.target.value)
                                    }
                                    className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col">
                                <label className="text-lg text-[#eeff87]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) =>
                                        setCustomerEmail(e.target.value)
                                    }
                                    className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <button
                                className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold  transition-colors"
                                onClick={handlePayment}
                            >
                                Upload Documents
                            </button>
                        </div>
                    )}
                </div>


                {/* Book Button */}
                {/*  {car.source === "zoomcar" ? (
                    <div className="flex justify-center items-center">
                        <button
                            className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold  transition-colors"
                            onClick={handlePayment}
                        >
                            Book & Pay
                        </button>
                    </div>
                ) : ""}*/}
                 {/* Temporary code for testing */}
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
    <h3 className="text-center mb-1 text-white text-3xl font-bold">
        Customer Details
    </h3>
    {car.source !== "zoomcar" ? (
        <p className="text-center text-gray-400 text-sm mb-4">
            (You must add your details to continue)
        </p>
    ) : ""}
    <hr className="my-1 mb-5 border-gray-500" />

   
    <div className="space-y-4">
        {/* Name Input */}
        <div className="flex flex-col">
            <label className="text-lg text-[#eeff87]">Name</label>
            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                placeholder="Enter your name"
            />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col">
            <label className="text-lg text-[#eeff87]">Phone</label>
            <input
                type="text"
                pattern="[0-9]{10}"
                maxLength={10}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                placeholder="Enter your phone number"
            />
        </div>

        {/* Email Input */}
        <div className="flex flex-col">
            <label className="text-lg text-[#eeff87]">Email</label>
            <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="p-2 rounded-lg bg-zinc-800 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                placeholder="Enter your email"
            />
        </div>
    </div>
    </div>
                {/* Book Button for Both Zoomcar & MyChoize */}
        <div className="flex justify-center items-center">
            <button
                className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold transition-colors"
                onClick={handlePayment}
            >
                Book & Pay
            </button>
        </div>


            </div>

            <ConfirmPage
                isOpen={isConfirmPopupOpen}
                close={() => setIsConfirmPopupOpen(false)}
            />
        </div>
    );
}

export default BookingPage;
