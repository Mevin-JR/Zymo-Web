import NavBar from "../components/NavBar";
import Header from "../components/homecomponent/Header";
import RSB from "../components/homecomponent/RSB";
import HeroImage from "../components/homecomponent/HeroImage";
import Benefits from "../components/homecomponent/Benefits";
import Reviews from "../components/homecomponent/Reviews";
import Cities from "../components/homecomponent/Cities";
import Footer from "../components/Footer";
import BrandsAvailable from "../components/homecomponent/BrandsAvailable";
import ServiceProvider from "../components/homecomponent/ServiceProvider";
import { FaWhatsapp } from "react-icons/fa";
import NewRSB from "../components/NewRSB";
import useTrackEvent from "../hooks/useTrackEvent";
import { Link } from "react-router-dom";
import ChatBot from "../components/chatbot/Chatbot";
const HomeScreen = () => {
    const trackEvent = useTrackEvent();

    const handleWhatsappClicks=(label)=>{
        trackEvent("Whatsapp Icon", "Whatsapp Clicked!",label);
    }
    return (
        <>
            <NavBar />
            <div className="container flex flex-col w-full mx-auto">
                <div className="container">
                    <Header />
                    <NewRSB />
                    <HeroImage />
                    {/* <RSB /> */}
                    <Benefits />
                    <BrandsAvailable />
                    <ServiceProvider />
                    <Reviews />
                    <Cities />
                </div>
                {/* WhatsApp Floating Button */}
                <a
                    href="https://wa.me/919987933348"
                    className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={()=> handleWhatsappClicks("Whatsapp")}
                >
                    <FaWhatsapp className="text-3xl" />
                </a>
                <ChatBot></ChatBot>
                
            </div>
            <Footer />
        </>
    );
};

export default HomeScreen;
