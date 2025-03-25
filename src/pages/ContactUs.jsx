import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
const ContactUs = ({ title }) => {
    useEffect(() => {
        document.title = title;
      }, [title]);
    return (
        <>
       <Helmet>
                <title>{title}</title>
                <meta name="description" content="Get in touch with Zymo for inquiries, support, or business partnerships. We're here to help!" />
                <meta property="og:title" content={title} />
        <meta property="og:description" content="Contact Zymo for assistance with your bookings, customer support, or business collaborations." />
                <link rel="canonical" href="https://zymo.app/contact-us" />
            </Helmet>
            <NavBar />

            <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
                <div className="max-w-4xl  bg-[#303030] rounded-lg shadow-lg p-8 px-9 ">
                    <div className="font-bold text-lg mb-2 text-[#faffa4] text-center">
                        Contact Us
                    </div>
                    <br />
                    <p>
                        Phone:{" "}
                        <a
                            href="tel:9987933348"
                            className="hover:text-[#faffa4]"
                        >
                            +91 9987933348
                        </a>
                    </p>
                    <br />
                    <p>
                        Whatsapp:{" "}
                        <a
                            href="tel:9987933348"
                            className="hover:text-[#faffa4]"
                        >
                            +91 9987933348
                        </a>
                    </p>
                    <br />
                    <p>
                        Email:{" "}
                        <a
                            href="mailto:hello@zymo.app"
                            className="hover:text-[#faffa4]"
                        >
                            hello@zymo.app
                        </a>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactUs;
