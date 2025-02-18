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

const HomeScreen = () => {
    return (
        <>
              <NavBar />
            <div className="container flex flex-col w-full mx-auto">
                <div className="container">
                    <Header />
                    <HeroImage />
                    <RSB />
                    <Benefits />
                    <BrandsAvailable />
                    <ServiceProvider />
                    <Reviews />
                    <Cities />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default HomeScreen;
