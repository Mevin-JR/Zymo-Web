import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const CancellationPolicy = ({ title }) => {
    const navigate=useNavigate();
    useEffect(() => {
        document.title = title;
    }, [title]);
    return (
        <>
         <Helmet>
                <title>{title}</title>
                <meta name="description" content="Check Zymo’s cancellation and refund policies to understand how to modify or cancel bookings with ease." />
                <link rel="canonical" href="https://zymo.app/cancellation-policy" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Check Zymo’s cancellation and refund policies to understand how to modify or cancel bookings with ease." />
            </Helmet>
            <NavBar />
            <button
                onClick={() => navigate("/")}
                className="text-white m-5 cursor-pointer"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
                <div className="max-w-4xl p-8">
                    <h1 className="text-3xl font-bold text-[#faffa4] mb-6">
                        Zymo Cancellation & Refund Policy
                    </h1>
                    <hr className="mb-4" />
                    
                    <h2 className="text-2xl font-bold mb-2">1. Introduction</h2>
                    <p className="mb-4">
                        At Zymo, we understand that plans may change, and you may need to cancel your car rental booking. To provide transparency and clarity, we have outlined our cancellation and refund policy below. Please review the details carefully before making a reservation.
                    </p>
                    
                    <h2 className="text-2xl font-bold mb-2">2. Cancellation Policy</h2>
                    <p className="mb-4">
                        The cancellation charges vary depending on the time of cancellation before the trip start time. The policy is categorized into <strong>Non-Zoomcar Bookings</strong> and <strong>Zoomcar Bookings</strong> as follows:
                    </p>
                    
                    <h3 className="text-xl font-bold mb-2">2.1 Non-Zoomcar Bookings</h3>
                    <ul className="mb-4 list-disc pl-5">
                        <li><strong>Up to 6 Hours Before Trip Start Time:</strong> 100% cancellation charge (No refund).</li>
                        <li><strong>Between 6-24 Hours Before Trip Start Time:</strong> 50% cancellation charge (50% refund).</li>
                        <li><strong>More than 24 Hours Before Trip Start Time:</strong> 2% cancellation charge (98% refund).</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold mb-2">2.2 Zoomcar Bookings</h3>
                    <ul className="mb-4 list-disc pl-5">
                        <li><strong>More than 6 Hours Before Trip Start Time:</strong> 50% of the booking amount will be refunded.</li>
                        <li><strong>Within 6 Hours of the Trip Start Time or After the Trip Has Started:</strong> No refund (100% cancellation charge applies).</li>
                        <li>In case a user has cancelled multiple consecutive bookings then they will be charged 50%.</li>
                        <li>In case of no car available, 100% booking fee will be refunded.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mb-2">3. How to Cancel a Booking</h2>
                    <ul className="mb-4 list-disc pl-5">
                        <li><strong>Via Website:</strong> Log in to your Zymo account on www.zymo.app, go to "My Bookings," select the booking, and click "Cancel."</li>
                        <li><strong>Via Mobile App:</strong> Open the Zymo app, navigate to "My Bookings," and select "Cancel Booking."</li>
                        <li><strong>Via Customer Support:</strong> Contact our support team at +91-9987933348 for assistance.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mb-2">4. Refund Process</h2>
                    <ul className="mb-4 list-disc pl-5">
                        <li>Refunds will be initiated within 5-7 business days after cancellation confirmation.</li>
                        <li>Refunds will be credited to the original payment method used at the time of booking.</li>
                        <li>If the refund is not received within the stipulated period, please contact our support team.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mb-2">5. Important Notes</h2>
                    <ul className="mb-4 list-disc pl-5">
                        <li>Partial cancellations are not allowed. If you wish to modify your booking, please contact our support team.</li>
                        <li>Any applicable transaction fees or bank charges will not be refunded.</li>
                        <li>In case of any disputes regarding cancellations or refunds, Zymo reserves the right to make the final decision.</li>
                    </ul>
                    
                    <h2 className="text-2xl font-bold mb-2">6. Contact Us</h2>
                    <ul className="mb-4 list-disc pl-5">
                        <li><strong>Phone:</strong> +91-9987933348</li>
                        <li><strong>Live Chat:</strong> Available on our website and mobile app.</li>
                    </ul>

                    <p>Thank you for choosing Zymo. We appreciate your cooperation and understanding of our policies.</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CancellationPolicy;