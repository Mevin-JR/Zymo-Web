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

const App = () => {
    return (
        <>
            <BrowserRouter>
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

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;
