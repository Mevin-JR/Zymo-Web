import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UpcomingBookingCard from "./UpcomingBookingCard";
import PastBookings from "./PastBookings";
import ReactGA from 'react-ga4';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


function UserNavigation(label) {
  ReactGA.event({
    category: 'User Interaction',
    action: 'Button Clicked',
    label: label,
  });
}

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate=useNavigate();

  return (
    <div className="bg-[#212121] min-h-screen text-white">
      <NavBar />

      <button
        onClick={() => navigate("/")}
        className="text-white m-5 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

        {/* Tabs */}
        <div className="flex space-x-6 text-lg border-b border-gray-700 pb-2">
          <button
            className={`${activeTab === "upcoming" ? "text-[#faffa4]" : "text-gray-400"
              } cursor-pointer hover:text-white`}
            onClick={() => {
              setActiveTab("upcoming")
              UserNavigation("Upcoming Bookings");
            }}
          >
            Upcoming
          </button>
          <button
            className={`${activeTab === "past" ? "text-[#faffa4]" : "text-gray-400"
              } cursor-pointer hover:text-white`}
            onClick={() => {
              setActiveTab("past");
              UserNavigation("Past Bookings");
            }}

          >
            Past
          </button>
          <button
            className={`${activeTab === "cancelled" ? "text-[#faffa4]" : "text-gray-400"
              } cursor-pointer hover:text-white`}
            onClick={() => {
              setActiveTab("cancelled")
              UserNavigation("Cancelled Bookings");
            }}
          >
            Cancelled
          </button>
        </div>

        {/* Conditional Rendering Based on Tab */}
        <div>
          {activeTab === "upcoming" && (
            <>
              <UpcomingBookingCard />
              <UpcomingBookingCard />
            </>
          )}
          {activeTab === "past" && (
            <>
              <PastBookings />
            </>
          )}
          {activeTab === "cancelled" && (
            <>
              {/* Add the page before using components */}
              {/* <CancelledBookings /> */}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
