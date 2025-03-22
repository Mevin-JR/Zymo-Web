import { useEffect } from 'react';
import { BrowserRouter, Routes, Route , useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ErrorPage from "./components/ErrorPage";
import HomeScreen from "./screens/HomeScreen";
import BookingPage from "./screens/BookingPage";
import BookingCard from "./screens/BookingCard";
import Listing from "./screens/Listing";
import { ToastContainer } from "react-toastify";
import Details from "./screens/Details";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import BlogsMainPage from "./pages/BlogsMainPage";
import BlogDetailPage from "./pages/BlogDetailsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsofService from "./pages/TermsofService";
import CancellationPolicy from "./pages/CancellationPolicy";
import CareerForm from "./pages/Career";
import YourDetails from "./pages/details";
import Profile from "./components/Profile";
import NearestCar from "./pages/Buy/NearestCar";
import CarDetails from "./pages/Buy/CarDetails";
import MyBookings from "./pages/MyBookings";

import TestDrivePopup from "./components/buycomponent/TestDrivePopup";
import TestDriveInputForm from "./components/buycomponent/TestDriveInputForm";
import TestDriveConfirmPage from "./components/buycomponent/TestDriveConfirmPage";
import ExtendedTestDriveFormPage from "./pages/Buy/ExtendedTestDriveEnterInformation";
import ExtendedTestDriveUploadDocuments from "./pages/Buy/ExtendedTestDriveUploadDocuments";
import ExtendedTestDriveDatePicker from "./pages/Buy/ExtendedTestDriveDatePicker";
import ExtendedTestDriveSummary from "./pages/Buy/ExtendedTestDriveSummary";
import CreateBlogPage from "./pages/CreateBlog/CreateBlogPage";
import CreateEditBlogPage from "./pages/CreateBlog/createEditBlogPage";
import Agent from "./components/Agent.jsx";
import AgentPage from "./components/AgentPage.jsx";
import PageTracker from "./components/PageTracker.jsx";

const App = () => {   
    
    return (
        <>
            <BrowserRouter>
                <PageTracker/>
                <ScrollToTop /> {/* Ensures scrolling to top on route change */}
                    <Routes>
                        {/* HomePage urls */}
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/home" element={<HomeScreen />} />
                        <Route
                            path="/self-drive-car-rentals"
                            element={<HomeScreen />}
                        />
                      

                        {/* Page2 */}
                        <Route
                            path="/self-drive-car-rentals/:city/cars"
                            element={<Listing />}
                        />

                        {/* Page3 */}
                        <Route path="/self-drive-car-rentals/:city/cars/packages" element={<BookingCard />} />

                        {/* Page4 */}
                        <Route
                            path="/self-drive-car-rentals/:city/cars/booking-details"
                            element={<Details />}
                        />

                        {/* Page5 */}
                        <Route
                            path="/self-drive-car-rentals/:city/cars/booking-details/confirmation"
                            element={<BookingPage />}
                        />

                        {/* Buy Page Routes*/}
                        <Route path="/buy" element={<NearestCar />} />
                        <Route path="/testdrive" element={<TestDrivePopup />} />
                        <Route path="/buy/car-details/:id" element={<CarDetails />} />

                        {/* Extended Test Drive Summary & date picker &  input form and confirm page */}
                        <Route path="/buy/summary/:id" element={<ExtendedTestDriveSummary />} />
                        <Route path="/buy/date-picker" element={<ExtendedTestDriveDatePicker />} />
                        <Route path="/buy/upload-info" element={<ExtendedTestDriveFormPage />} />
                        <Route path="/buy/upload-doc" element={<ExtendedTestDriveUploadDocuments />} />

                        {/* Test Drive input form and confirm page */}
                        <Route path="/buy/test-drive-inputform" element={<TestDriveInputForm />} />
                        <Route path="/buy/test-drive-confirmpage" element={<TestDriveConfirmPage />} />



                        {/* NavBar Pages */}
                        {/* About Us */}
                        <Route path="/about-us" element={<AboutUs />} />
                        {/* Contact Us */}
                        <Route path="/contact-us" element={<ContactUs />} />

                        <Route path="/profile" element={<Profile />} />

                        {/* Carrer */}
                        <Route path="/career" element={<CareerForm />} />
                        {/* Blogs  */}
                        <Route path="/blogs" element={<BlogsMainPage />} />
                        <Route path="/blogs/:title" element={<BlogDetailPage />} />
                        <Route path="/createblog/:id" element={<CreateBlogPage />} />
                        <Route path="/createblog" element={<CreateEditBlogPage />} />

                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/details" element={<YourDetails />} />
                        <Route
                            path="/terms-of-service"
                            element={<TermsofService />}
                        />
                        <Route
                            path="/cancellation-policy"
                            element={<CancellationPolicy />}
                        />
                        <Route
                            path="/my-bookings"
                            element={<MyBookings />}
                        />
                        <Route
                        path="/agent-login"
                        element={<Agent />}
                    />
                    <Route
                        path="/agent-info"
                        element={<AgentPage/>}
                    />
                    <Route path="*" element={<ErrorPage />} />
                    </Routes>
                    <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;
