import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ErrorPage from "./components/ErrorPage";
import HomeScreen from "./screens/HomeScreen";
import BookingPage from "./screens/BookingPage";
import BookingCard from "./screens/BookingCard";
import Listing from "./screens/Listing";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import ConfirmPage from "./components/ConfirmPage";
import Details from "./screens/Details";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import CancellationPolicy from "./pages/CancellationPolicy";
import CareerForm from "./pages/Career";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop /> {/* Ensures scrolling to top on route change */}
                <Routes>
                    {/* HomePage */}
                    <Route path="/" element={<HomeScreen />} />

                    {/* Page2 */}
                    <Route path="/listing/:city" element={<Listing />} />

                    {/* Page3 */}
                    {/* Temporarily disabled */}
                    <Route path="/booking-card" element={<BookingCard />} />

                    {/* Page4 */}
                    <Route
                        path="/details/:city/:carName"
                        element={<Details />}
                    />

                    {/* Page5 */}
                    <Route
                        path="/booking/:userEmail"
                        element={<BookingPage />}
                    />

                    {/* NavBar Pages */}
                    {/* About Us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    {/* Contact Us */}
                    <Route path="/contact-us" element={<ContactUs />} />
                    {/* Carrer */}
                    <Route path="/career" element={<CareerForm />} />
                    {/* Blogs  */}
                    <Route path="/blogs" element={<Blog />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route
                        path="/termsofservice"
                        element={<TermsofService />}
                    />
                    <Route
                        path="/cancellationpolicy"
                        element={<CancellationPolicy />}
                    />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;
