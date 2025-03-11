import { ArrowLeft, MapPin, Calendar, IndianRupee, Car } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import ConfirmPage from "../components/ConfirmPage";
import { formatDate, formatFare, toPascalCase } from "../utils/helperFunctions";
import { findPackage ,createBooking  as createMyChoizeBooking } from "../utils/mychoize";
import { doc, getDoc } from "firebase/firestore";
import { appDB } from "../utils/firebase";
import { fetchMyChoizeLocationList, findPackage, formatDateForMyChoize } from "../utils/mychoize";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { appDB, appStorage } from "../utils/firebase";
import PickupPopup from "../components/PickupPopup";
import DropupPopup from "../components/DropupPopup";
import BookingPageFormPopup from "../components/BookingPageFormPopup";
import BookingPageUploadPopup from "../components/BookingPageUploadPopup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    const { car, startDate, endDate, userData, activeTab } = location.state;
    
    const startDateFormat = formatDate(startDate);
    const endDateFormat= formatDate(endDate)
    const [customerName, setCustomerName] = useState(userData.name);
    const [customerPhone, setCustomerPhone] = useState(userData.phone);
    const [customerEmail, setCustomerEmail] = useState(userData.email);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [vendorDetails, setVendorDetails] = useState(null);

    const [gst, setGst] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);

    const [showPickupPopup, setShowPickupPopup] = useState(false);
    const [showDropupPopup, setShowDropupPopup] = useState(false);
    const [selectedPickupLocation, setSelectedPickupLocation] = useState(null);
    const [selectedDropLocation, setSelectedDropLocation] = useState(null);
    const [mychoizePickupLocations, setMychoizePickupLocations] = useState({});
    const [mychoizeDropupLocations, setMychoizeDropupLocations] = useState({});

    const [showFormPopup, setShowFormPopup] = useState(false);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [formData, setFormData] = useState(null);
    const [uploadDocData, setUploadDocData] = useState(null);
    const [bookingData, setBookingData] = useState(null);

    const customerUploadDetails = formData && uploadDocData;

    const functionsUrl = import.meta.env.VITE_FUNCTIONS_API_URL;
    // const functionsUrl = "http://127.0.0.1:5001/zymo-prod/us-central1/api";

    const vendor = car.source === "zoomcar" ? "ZoomCar" : car.source === "mychoize" ? "Mychoize" : car.source;
    useEffect(() => {
        const fetchVendorDetails = async () => {
            const docRef = doc(appDB, "carvendors", vendor);
            const docSnap = await getDoc(docRef);

            setVendorDetails(docSnap.data());
        };
        fetchVendorDetails();
    }, [car.source]);

    useEffect(() => {
        if (!car.fare || !vendorDetails) return;

        const rawFare = parseInt(car.fare.slice(1));
        const gstPercent = parseFloat(vendorDetails?.TaxSd) || 0;
        const discountPercent = parseFloat(vendorDetails?.DiscountSd) || 0;
        const deposit = parseInt(vendorDetails?.Securitydeposit) || 0;

        const gstValue = rawFare * gstPercent;
        const discountValue = rawFare * (1 - discountPercent);

        setGst(gstValue);
        setDiscount(discountValue);

        const amount = (rawFare + gstValue + deposit) - discountValue;
        setPayableAmount(amount);
    }, [car.fare, vendorDetails]);

    useEffect(() => {
        if (selectedPickupLocation && selectedDropLocation) {
            const newDeliveryCharges = parseInt(selectedPickupLocation.DeliveryCharge) + parseInt(selectedDropLocation.DeliveryCharge);
            setPayableAmount(prevAmount => {
                return prevAmount - deliveryCharges + newDeliveryCharges;
            })
            setDeliveryCharges(newDeliveryCharges);
        }
    }, [selectedPickupLocation, selectedDropLocation])

    const formattedFare = formatFare(car.fare);

    const preBookingData = {
        headerDetails: {
            name: `${car.brand} ${car.name}`,
            type: car.options.slice(0, 3).join(" | "),
            range: `${findPackage(car.rateBasis)}`,
            image: car.images[0],
        },
        pickup: {
            startDate: startDateFormat,
            endDate: endDateFormat,
            city: city,
        },
        carDetails: {
            registration: vendorDetails?.plateColor || "N/A",
            package: activeTab === "subscribe" ? "Subscription" : car.rateBasis === "DR" ? "Unlimited KMs" :
             findPackage(car.rateBasis),
            transmission: car.options[0],
            fuel: car.options[1],
            seats: car.options[2],
        },
        fareDetails: {
            base: car.actual_fare ? car.actual_fare : formattedFare,
            fare: formattedFare,
            gst: car.source === "zoomcar" ? "Incl. in Base Fare" : formatFare(gst),
            deposit: car.source === "zoomcar" ? "₹0" : formatFare(vendorDetails?.Securitydeposit),
            discount: formatFare(discount),
            payable_amount: formatFare(payableAmount),
        },
        customer: {
            name: userData.name === null ? "N/A" : userData.name,
            mobile: userData.phone === null ? "N/A" : userData.phone,
            email: userData.email === null ? "N/A" : userData.email,
        },
    };

    const filterLocationLists = (locationList) => {
        const filteredLocationList = locationList
            .filter(location => !location.LocationName.includes("Monthly"));

        const hubLocations = filteredLocationList
            .filter(location => !location.IsPickDropChargesApplicable)
        const doorstepDeliveryLocations = filteredLocationList
            .filter(location => location.LocationName.includes("Doorstep"))
            .filter(location => location.IsPickDropChargesApplicable);
        const airportLocations = filteredLocationList
            .filter(location => location.LocationName.includes("Airport"))

        const filteredLocations = new Set([
            ...hubLocations,
            ...doorstepDeliveryLocations,
            ...airportLocations
        ])
        const nearbyLocations = filteredLocationList
            .filter(location => !filteredLocations.has(location))

        return {
            hubs: hubLocations,
            doorstep_delivery: doorstepDeliveryLocations,
            airport_locations: airportLocations,
            nearby_locations: nearbyLocations,
        }
    }

    useEffect(() => {
        const mychoizeFormattedPickDate = formatDateForMyChoize(startDate);
        const mychoizeFormattedDropDate = formatDateForMyChoize(endDate);

        const fetchLocationList = () => fetchMyChoizeLocationList(city, mychoizeFormattedDropDate, mychoizeFormattedPickDate)
            .then((data) => {
                const pickupLocations = filterLocationLists(data.BranchesPickupLocationList);
                const dropupLocations = filterLocationLists(data.BranchesDropupLocationList);

                setMychoizePickupLocations(pickupLocations);
                setMychoizeDropupLocations(dropupLocations);
            });
        fetchLocationList();
    }, [selectedPickupLocation, selectedDropLocation])

    const uploadDocs = async (images) => {
        try {
            const timestamp = Date.now();
            const folderPath = `userImages/${formData.email}_${timestamp}`;

            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const fileRef = ref(appStorage, `${folderPath}/${image.name}`);
                    await uploadBytes(fileRef, image.file_object);
                    return await getDownloadURL(fileRef);
                })
            );

            // URLs of uploaded images
            const [aadharFrontUrl, aadharBackUrl, licenseFrontUrl, licenseBackUrl] = imageUrls;

            const documents = {
                LicenseBack: licenseBackUrl,
                LicenseFront: licenseFrontUrl,
                aadhaarBack: aadharBackUrl,
                aadhaarFront: aadharFrontUrl,
            };

            return documents;

        } catch (error) {
            console.error("Error uploading documents to Firebase:", error);
        }
    }

    // Sends whatsapp notif to both user and zymo
    const sendWhatsappNotif = async (data) => {
        setIsConfirmPopupOpen(true);
        await fetch(`${functionsUrl}/message/booking-confirmation`, {
            method: "POST",
            body: JSON.stringify({
                data
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    const handleMychoizeBooking = async (data) => {
        const bookingId = 'Z' + new Date().getTime().toString();
        const documents = await uploadDocs(uploadDocData);

        const bookingDataStructure = {
            Balance: 0,
            CarImage: car.images[0],
            CarName: car.name,
            City: city,
            DateOfBirth: formData.dob,
            DateOfBooking: Date.now(),
            Documents: documents,
            Drive: "",
            Email: formData.email,
            EndDate: endDateFormatted,
            EndTime: "",
            FirstName: formData.userName,
            MapLocation: car.address,
            "Package Selected": findPackage(car.rateBasis),
            PhoneNumber: formData.phone,
            "Pickup Location": selectedPickupLocation.LocationName,
            "Promo Code Used": "",
            SecurityDeposit: vendorDetails?.Securitydeposit,
            StartDate: startDateFormatted,
            StartTime: "",
            Street1: "",
            Street2: "",
            TimeStamp: formatDate(Date.now()),
            Transmission: car.options[0],
            UserId: userData.uid,
            Vendor: vendor,
            Zipcode: "",
            actualPrice: parseInt(car.fare.slice(1)),
            bookingId: bookingId,
            deliveryType: selectedPickupLocation.LocationName.includes("Doorstep") ? "Doorstep Delivery" : "Self Pickup",
            paymentId: data.razorpay_payment_id,
            price: payableAmount
        }

        await addDoc(collection(appDB, "CarsPaymentSuccessDetails"), bookingDataStructure);
        setBookingData(bookingDataStructure);

        const whatsappMsgStucture = {
            id: bookingId,
            customerName: formData.userName,
            dateOfBirth: formData.dob,
            phone: formData.phone,
            email: formData.email,
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            city: city,
            pickupLocation: selectedPickupLocation.HubAddress,
            amount: formatFare(payableAmount),
            vendorName: vendor,
            vendorPhone: "+919987933348", // TODO: Change this later
            vendorLocation: car.address,
            model: `${car.brand} ${car.name}`,
            transmission: car.options[0],
            package: findPackage(car.rateBasis),
            freeKMs: "",
            paymentMode: "Online (Razorpay)",
            serviceType: "",
        }

        sendWhatsappNotif(whatsappMsgStucture);
    }

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
            // const amount = parseInt(car.fare.slice(1));
            const orderData = await createOrder(payableAmount, "INR");
            const options = {
                key: import.meta.env.VITE_RAZORPAY_TEST_KEY,
                amount: orderData.amount,
                currency: "INR",
                name: "Zymo",
                description: "Zymo Car Rental",
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
                        handleMychoizeBooking(data);
                        // setIsConfirmPopupOpen(true);
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

    const handleUploadDocuments = () => {
        if (!selectedPickupLocation || !selectedDropLocation) {
            toast.warn("Please choose the pickup and drop locations", {
                position: "top-center",
                autoClose: 1000 * 3,
            });
            return;
        }

        setShowFormPopup(true);
    }

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
                            {preBookingData.headerDetails.name}
                        </h2>
                    </div>

                    <div className="flex-1 flex justify-center -mt-10">
                        <img
                            src={
                                preBookingData.headerDetails.image ||
                                "/placeholder.svg"
                            }
                            alt={`${preBookingData.headerDetails.name}`}
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
                        Pickup Details
                    </h3>
                    <hr className="my-1 mb-5 border-gray-500" />
                    <div className="space-y-2">

                        {/* Start Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>Start Date</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.pickup.startDate}
                            </p>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#eeff87]" />
                                <p>End Date</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.pickup.endDate}
                            </p>
                        </div>
                    </div>

                    {car.source === "mychoize" ? (
                        <>
                            <div className="mt-5 mb-4">
                                <label className="block text-sm font-medium mb-1 text-[#faffa4]">Pickup Location | Time | Charges</label>
                                <div
                                    className="bg-[#404040] text-white p-3 rounded-md cursor-pointer"
                                    onClick={() => setShowPickupPopup(true)}
                                >
                                    {selectedPickupLocation ? `${selectedPickupLocation.LocationName} | ${selectedPickupLocation.IsPickDropChargesApplicable ? `₹${selectedPickupLocation.DeliveryCharge}` : "FREE"}` : "Select pickup location"}
                                </div>
                                <textarea disabled className="w-full mt-2 p-3 bg-[#404040] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#faffa5]" placeholder={selectedPickupLocation ? selectedPickupLocation.HubAddress : ""} rows="3"></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-[#faffa4]">Drop Location | Time | Charges</label>
                                <div
                                    className="bg-[#404040] text-white p-3 rounded-md cursor-pointer"
                                    onClick={() => setShowDropupPopup(true)}
                                >
                                    {selectedDropLocation ? `${selectedDropLocation.LocationName} | ${selectedDropLocation.IsPickDropChargesApplicable ? `₹${selectedDropLocation.DeliveryCharge}` : "FREE"}` : "Select drop location"}
                                </div>
                                <textarea disabled className="w-full mt-2 p-3 bg-[#404040] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#faffa5]" placeholder={selectedDropLocation ? selectedDropLocation.HubAddress : ""} rows="3"></textarea>
                            </div>

                            {showPickupPopup && <PickupPopup setIsOpen={setShowPickupPopup} pickupLocations={mychoizePickupLocations} setSelectedPickupLocation={setSelectedPickupLocation} />}
                            {showDropupPopup && <DropupPopup setIsOpen={setShowDropupPopup} dropupLocations={mychoizeDropupLocations} setSelectedDropLocation={setSelectedDropLocation} />}
                        </>
                    ) : ""}

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
                            <p className="ml-auto text-white">{preBookingData.carDetails.registration}</p>
                        </div>

                        {/* Package */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Package</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.carDetails.package}
                            </p>
                        </div>

                        {/* Transmission */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Transmission</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.carDetails.transmission}
                            </p>
                        </div>

                        {/* Fuel */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Fuel Type</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.carDetails.fuel}
                            </p>
                        </div>

                        {/* Seats */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-[#eeff87]" />
                                <p>Seats</p>
                            </div>
                            <p className="ml-auto text-white">
                                {preBookingData.carDetails.seats}
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
                            <span className="ml-auto text-white">
                                {preBookingData.fareDetails.base}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>GST {car.source !== "zoomcar" ? `(${(vendorDetails?.TaxSd * 100).toFixed(0)}%)` : ""}</span>
                            </div>
                            <span className="ml-auto text-white">
                                {preBookingData.fareDetails.gst}
                            </span>
                        </div>

                        {/* Refundable Deposit */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Security Deposit</span>
                            </div>
                            <span className="ml-auto text-white">
                                {preBookingData.fareDetails.deposit}
                            </span>
                        </div>

                        {/* Discount */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Discount {`(${((1 - vendorDetails?.DiscountSd) * 100).toFixed(0)}%)`}</span>
                            </div>
                            <span className="ml-auto text-white">
                                {`- ${preBookingData.fareDetails.discount}`}
                            </span>
                        </div>

                        {deliveryCharges > 0 ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                    <span>Delivery Charges</span>
                                </div>
                                <span className="ml-auto text-white">
                                    {formatFare(deliveryCharges)}
                                </span>
                            </div>
                        ) : ""}

                        <hr className="my-0 border-gray-600" />

                        {/* Payable Amount */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IndianRupee className="w-5 h-5 text-[#eeff87]" />
                                <span>Payable Amount</span>
                            </div>
                            <span className="ml-auto text-[#eeff87]">
                                {preBookingData.fareDetails.payable_amount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Customer Input Fields */}
                
                <div className="max-w-3xl mx-auto rounded-lg bg-[#303030] p-5">
                     <h3 className="text-center mb-1 text-white text-3xl font-bold">
        {car.source === "zoomcar" ? "Customer Details" : "Car Pickup & Drop Location"}
    </h3>
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
                                    className="p-2 rounded-lg bg-zinc-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
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
                                    className="p-2 rounded-lg bg-zinc-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
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
                                    className="p-2 rounded-lg bg-zinc-400 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#eeff87]"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <button
                                className={`px-6 py-2 rounded-lg font-semibold  transition-colors
                                ${!customerUploadDetails
                                        ? "text-black bg-[#eeff87] hover:bg-[#e2ff5d] cursor-pointer"
                                        : "text-[#eeff87] bg-transparent border-2 border-[#eeff87] cursor-not-allowed"
                                    }`}
                                onClick={handleUploadDocuments}
                                disabled={customerUploadDetails}
                            >
                                Upload Documents
                            </button>
                            {customerUploadDetails ? (
                                <p className="mt-4 text-green-400 text-sm">Details and Documents uploaded successfully</p>
                            ) : ""}

                            {showFormPopup && <BookingPageFormPopup isOpen={showFormPopup} setIsOpen={setShowFormPopup} setUserFormData={setFormData} showUploadPopup={setShowUploadPopup} />}
                            {showUploadPopup && <BookingPageUploadPopup isOpen={showUploadPopup} setIsOpen={setShowUploadPopup} setUserUploadData={setUploadDocData} />}
                        </div>
                    )}
                </div>


                {/* Book Button */}
                {car.source === "zoomcar" ? (
                    <div className="flex justify-center items-center">
                        <button
                            className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold  transition-colors"
                            onClick={handlePayment}
                        >
                            Book & Pay
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <button
                            className="text-black bg-[#eeff87] hover:bg-[#e2ff5d] px-6 py-2 rounded-lg font-semibold  transition-colors"
                            onClick={handlePayment}
                            disabled={!customerUploadDetails}
                        >
                            Book & Pay
                        </button>
                    </div>
                )}
            </div>

            <ConfirmPage
                isOpen={isConfirmPopupOpen}
                close={() => setIsConfirmPopupOpen(false)}
            />
        </div>
    );
}

export default BookingPage;
