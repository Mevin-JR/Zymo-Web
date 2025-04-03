import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactUs = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Have questions? Contact Zymo for  inquiries, support, or business partnerships. We’re here to help!"
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Have questions? Contact Zymo for  inquiries, support, or business partnerships. We’re here to help!"
        />
        <link rel="canonical" href="https://zymo.app/contact-us" />
      </Helmet>
      <NavBar />
      <button
        onClick={() => navigate("/")}
        className="text-white m-5 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
        <div className="max-w-4xl  bg-[#303030] rounded-lg shadow-lg p-8 px-9 ">
          <div className="font-bold text-xl mb-2 text-[#faffa4] text-center">
           <h1> Contact Us</h1> 
          </div>
          <br />
          <div className="max-w-lg text-center">
            <p>
              Phone:{" "}
              <a href="tel:9987933348" className="hover:text-[#faffa4] text-gray-300">
                +91 9987933348
              </a>
            </p>
            <br />
            <p>
              Whatsapp:{" "}
              <a href="tel:9987933348" className="hover:text-[#faffa4] text-gray-300">
                +91 9987933348
              </a>
            </p>
            <br />
            <p>
              Email:{" "}
              <a href="mailto:hello@zymo.app" className="hover:text-[#faffa4] text-gray-300">
                hello@zymo.app
              </a>
            </p>
            <br />
            <p>
              Address: <span className="text-gray-300">2002, Marina Enclave, Jankalyan Nagar, Malad
              West Mumbai 400095</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
