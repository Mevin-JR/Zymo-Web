import { ArrowLeft, MapPin, Calendar, IndianRupee } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmPage from "../components/ConfirmPage";

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
    const { car, formattedCity, userData, startDate, endDate } =
        location.state || {};

    const { userEmail } = useParams();

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

    const [customerName, setCustomerName] = useState(userData.name);
    const [customerPhone, setCustomerPhone] = useState(userData.phone);
    const [customerEmail, setCustomerEmail] = useState(userEmail);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const functionsUrl = import.meta.env.VITE_FUNCTIONS_API_URL;

    // emailjs.init({
    //     publicKey: "u74XY2gOIbkt_YNz7",
    //     // privateKey: "",
    // });

    // const emailPaymentConfirmation = async (paymentId, orderId, amt) => {
    //     const templateParams = {
    //         to_name: customerName,
    //         payment_id: paymentId,
    //         order_id: orderId,
    //         amount: amt,
    //     };

    //     try {
    //         const response = await emailjs.send(
    //             "service_uwvt2p8",
    //             "template_069rahc",
    //             templateParams
    //         );

    //         console.log(response);
    //     } catch (error) {
    //         console.error("Error sending payment confirmation:", error);
    //     }
    // };

    const bookingData = {
        carDetails: {
            name: `${car.brand} ${car.name}`,
            type: car.options[0],
            range: "Unlimited KM",
            image: car.images[0],
        },
        pickup: {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            city: formattedCity,
        },
        customer: {
            name: userData.name === null ? "N/A" : userData.name,
            mobile: userData.phone === null ? "N/A" : userData.phone,
            email: userData.email === null ? "N/A" : userData.email,
        },
        fare: {
            // base: cardetails.actual_fare,
            // discount: ,
            deposit: car.fare,
        },
        voucher: {
            amount: 75,
        },
    };

    const createBooking = async (paymentData) => {
        const startDateEpoc = Date.parse(startDate);
        const endDateEpoc = Date.parse(endDate);

        const response = await fetch(
            `${functionsUrl}/zoomcar/bookings/create-booking`,
            {
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
                        city: formattedCity,
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
            }
        );

        if (!response.ok) {
            toast.error("Booking creation failed, Please try again later...", {
                position: "top-center",
                autoClose: 1000 * 3,
            });
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();
        console.log(data);
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
                city: formattedCity,
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
                        setIsConfirmPopupOpen(true);
                        // Create booking
                        // createBooking(data).catch((error) => {
                        //     console.error("Booking error:", error);
                        //     console.log(
                        //         "Initiating refund due to booking failure"
                        //     );
                        //     initiateRefund(data.razorpay_payment_id).then(
                        //         (refundResponse) => {
                        //             if (refundResponse.status === "processed") {
                        //                 navigate("/");
                        //                 toast.success(
                        //                     "A refund has been processed, please check your mail for more details",
                        //                     {
                        //                         position: "top-center",
                        //                         autoClose: 1000 * 10,
                        //                     }
                        //                 );
                        //             }
                        //         }
                        //     );
                        // });
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
                {/* Car Details */}
                <div className="flex flex-wrap justify-between items-center gap-5 rounded-lg p-6 shadow-sm w-full">
                    <div className="flex-1 min-w-[200px] text-xl">
                        <h2 className="font-semibold mb-2">
                            {bookingData.carDetails.name}
                        </h2>
                        <p className="text-muted-foreground mb-1">
                            {bookingData.carDetails.type}
                        </p>
                        <p className="text-muted-foreground">
                            {bookingData.carDetails.range}
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center -mt-10">
                        <img
                            src={
                                bookingData.carDetails.image ||
                                "/placeholder.svg"
                            }
                            alt={`${bookingData.carDetails.name}`}
                            className="w-full sm:w-96 lg:w-80 h-[200px] sm:h-[280px] lg:h-[200px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="flex-1 flex justify-end items-end gap-1 text-xl">
                        <div className="flex items-center gap-2">
                            <p className="text-muted-foreground whitespace-nowrap">
                                Fulfilled by:{" "}
                                <span className="text-xl text-[#eeff87]">
                                    Zoomcar
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="my-1 border-gray-400" />

                {/* Pickup Details */}
                <div className="max-w-3xl mx-auto rounded-lg">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Pickup
                    </h3>
                    <div className="space-y-2">
                        {/* Pickup Location */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#eeff87]" />
                                <p>Pickup Location:</p>
                            </div>
                            <p className="ml-auto">{bookingData.pickup.city}</p>
                        </div>

                        {/* Start Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>Start Date:</p>
                            </div>
                            <p className="ml-auto">
                                {bookingData.pickup.startDate}
                            </p>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>End Date:</p>
                            </div>
                            <p className="ml-auto">
                                {bookingData.pickup.endDate}
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="my-0 border-gray-400" />

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
                            <p className="ml-auto">
                                {bookingData.customer.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-[#eeff87]" />
                                <p>Mobile No:</p>
                            </div>
                            <p className="ml-auto">
                                {bookingData.customer.mobile}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-[#eeff87]" />
                                <p>Email Id:</p>
                            </div>
                            <p className="ml-auto">
                                {bookingData.customer.email}
                            </p>
                        </div>
                    </div>
                </div>
                <hr className="my-0 border-gray-400" /> */}

                {/* Fare Details */}
                <div className="max-w-3xl mx-auto rounded-lg">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Fare Details
                    </h3>
                    <div className="space-y-2">
                        {/* Base Fare */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Base Fare</span>
                            </div>
                            <span className="ml-auto">
                                {bookingData.fare.base}
                            </span>
                        </div>

                        {/* Discount */}
                        {/* <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                    <span>Discount</span>
                                </div>
                                <span className="ml-auto">
                                    {bookingData.fare.discount}
                                </span>
                            </div> */}

                        {/* Refundable Deposit */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Payable Amount</span>
                            </div>
                            <span className="ml-auto">
                                {bookingData.fare.deposit}
                            </span>
                        </div>
                    </div>
                </div>
                <hr className="my-0 border-gray-400" />

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
                <div className="max-w-lg mx-auto rounded-lg">
                    <h3 className="text-center mb-6 text-white text-3xl font-bold">
                        Customer Details
                    </h3>
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
                </div>

                <hr className="my-0 border-gray-400" />

                {/* Book Button */}
                <div className="flex justify-center items-center">
                    <button
                        className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold  transition-colors"
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
