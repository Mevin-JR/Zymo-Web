import React, { useEffect } from 'react';
import { webDB } from '../utils/firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function UpcomingBookingCard() {
  // Function to save booking details to Firestore
  const saveBookingToFirestore = async () => {
    try {
      const bookingData = {
        carName: "TATA Nexon EV",
        price: "₹3,360",
        dates: {
          from: "12th February 2025, 10:00 AM",
          to: "14th February 2025, 1:00 PM"
        },
        features: "250+ km | 10Km Free-Fuel | 5 seater",
        imageUrl: "../public/images/Cars/nexon.jpeg",
        timestamp: new Date()
      };

      // Add to Bookings collection
      const docRef = await addDoc(collection(webDB, "Bookings"), bookingData);
      console.log("Booking saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error saving booking: ", error);
    }
  };

  // Save booking when component mounts
  useEffect(() => {
    saveBookingToFirestore();
  }, []);

  return ( 
    <div>
      {/* Booking Card */}
      <div className="bg-[#363636] mt-4 p-4 rounded-lg flex items-center space-x-4">
        <img
          src="../public/images/Cars/nexon.jpeg" 
          alt="TATA Nexon EV"
          className="w-50 h-24 rounded-md"
        />
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-white">TATA Nexon EV</h3>
          <p className="text-gray-100">Price: ₹3,360</p>
          <p className="text-gray-100">
            From: 12th February 2025, 10:00 AM <br />
            To: 14th February 2025, 1:00 PM
          </p>
          <p className="text-gray-100 mt-1">
            250+ km | 10Km Free-Fuel | 5 seater
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-2">
          <button className="bg-[#faffa4] text-black px-4 py-2 rounded-md">
            Extend Booking
          </button>
          <button className="bg-[#faffa4] text-black px-4 py-2 rounded-md">
            If Cancelled By Vendor
          </button>
          <button className="text-red-500 font-semibold">Cancel Ride</button>
        </div>
      </div>
    </div>
  );
}