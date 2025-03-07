import { useState } from "react";

const PickupPopup = ({ setIsOpen }) => {
  return (
    <div className="text-[#faffa4] p-6">
      {/* Popup Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-[#303030] text-gray-300 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-500 pb-2">
            <h2 className="text-xl font-bold">Pickup Location</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#faffa4] text-2xl font-bold hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          {/* Table Header */}
          <div className="flex font-bold text-black bg-[#faffa4] p-3 mt-4 rounded">
            <span className="w-1/2">Location</span>
            <span className="w-1/4 text-center">Time</span>
            <span className="w-1/4 text-right">Cost</span>
          </div>
          <hr className="border-gray-500" />

          {/* Table Content */}
          <div className="mt-2">
            <div className="font-semibold">Hub Locations</div>
            <hr className="border-gray-500" />
            <div className="flex p-2">
              <span className="w-1/2">Swami Vivekananda Metro</span>
              <span className="w-1/4 text-center">24hrs</span>
              <span className="w-1/4 text-right">FREE</span>
            </div>
            <hr className="border-gray-500" />
            <div className="flex p-2">
              <span className="w-1/2">Outer Ring Road, HSR</span>
              <span className="w-1/4 text-center">7 am - 10 pm</span>
              <span className="w-1/4 text-right">FREE</span>
            </div>
            <hr className="border-gray-500" />

            <div className="font-semibold mt-4">Airport Locations</div>
            <hr className="border-gray-500" />
            <div className="flex p-2">
              <span className="w-1/2">Bengaluru Airport</span>
              <span className="w-1/4 text-center">9 am - 6 pm</span>
              <span className="w-1/4 text-right">₹1000</span>
            </div>
            <hr className="border-gray-500" />

            <div className="font-semibold mt-4">Doorstep Delivery</div>
            <hr className="border-gray-500" />
            <div className="flex p-2">
              <span className="w-1/2">10 Km From Hsr</span>
              <span className="w-1/4 text-center">8 am - 8 pm</span>
              <span className="w-1/4 text-right">₹400</span>
            </div>
            <hr className="border-gray-500" />

            <div className="font-semibold mt-4">Nearby Locations</div>
            <hr className="border-gray-500" />
            {["Hennur", "Koramangla", "MG Road", "Majestic", "BTM Layout"].map(
              (place) => (
                <>
                  <div key={place} className="flex p-2">
                    <span className="w-1/2">{place}</span>
                    <span className="w-1/4 text-center">8 am - 8 pm</span>
                    <span className="w-1/4 text-right">₹200</span>
                  </div>
                  <hr className="border-gray-500" />
                </>
              )
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full bg-[#faffa4] text-black py-2 rounded-md font-semibold hover:bg-[#e5e573]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupPopup;
