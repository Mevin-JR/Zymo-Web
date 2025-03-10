import { useState } from "react";
import { formatTo12 } from "../utils/helperFunctions";

const PickupPopup = ({ setIsOpen, pickupLocations, setSelectedPickupLocation }) => {

  const handleSelection = (location) => {
    setSelectedPickupLocation(location);
    setIsOpen(false);
  }

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
            <div className="font-semibold text-[#faffa4]">Hub Locations</div>
            <hr className="border-gray-500" />
            {pickupLocations?.hubs?.length > 0 ? (
              pickupLocations.hubs.map((location, index) => (
                <>
                  <hr className="border-gray-500" />
                  <div className="flex p-2 cursor-pointer hover:bg-gray-500/20" key={index} onClick={() => handleSelection(location)}>
                    <span className="w-1/2">{location.LocationName}</span>
                    <span className="w-1/4 text-center">24hrs</span>
                    <span className="w-1/4 text-right">FREE</span>
                  </div>
                </>
              ))
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-3 w-full max-w-6xl">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#404040] p-4 rounded-lg shadow-lg animate-pulse"
                  >
                    <div className="w-full h-5 bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}

            <div className="font-semibold mt-4 text-[#faffa4]">Airport Locations</div>
            <hr className="border-gray-500" />
            {pickupLocations?.hubs?.length > 0 ? (
              pickupLocations.airport_locations.map((location, index) => (
                <>
                  <hr className="border-gray-500" />
                  <div className="flex p-2 cursor-pointer hover:bg-gray-500/20" key={index} onClick={() => handleSelection(location)} >
                    <span className="w-1/2">{location.LocationName}</span>
                    <span className="w-1/4 text-center">{`${formatTo12(location.ShiftFrom)} to ${formatTo12(location.ShiftTo)}`}</span>
                    <span className="w-1/4 text-right">{`₹${location.DeliveryCharge}`}</span>
                  </div>
                </>
              ))
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-3 w-full max-w-6xl">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#404040] p-4 rounded-lg shadow-lg animate-pulse"
                  >
                    <div className="w-full h-5 bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}

            <div className="font-semibold mt-4 text-[#faffa4]">Doorstep Delivery</div>
            <hr className="border-gray-500" />
            {pickupLocations?.hubs?.length > 0 ? (
              pickupLocations.doorstep_delivery.map((location, index) => (
                <>
                  <hr className="border-gray-500" />
                  <div className="flex p-2 cursor-pointer hover:bg-gray-500/20" key={index} onClick={() => handleSelection(location)}>
                    <span className="w-1/2">{location.LocationName}</span>
                    <span className="w-1/4 text-center">{`${formatTo12(location.ShiftFrom)} to ${formatTo12(location.ShiftTo)}`}</span>
                    <span className="w-1/4 text-right">{`₹${location.DeliveryCharge}`}</span>
                  </div>
                </>
              ))
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-3 w-full max-w-6xl">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#404040] p-4 rounded-lg shadow-lg animate-pulse"
                  >
                    <div className="w-full h-5 bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}

            <div className="font-semibold mt-4 text-[#faffa4]">Nearby Locations</div>
            <hr className="border-gray-500" />
            {pickupLocations?.hubs?.length > 0 ? (
              pickupLocations.nearby_locations.map((location, index) => (
                <>
                  <hr className="border-gray-500" />
                  <div className="flex p-2 cursor-pointer hover:bg-gray-500/20" key={index} onClick={() => handleSelection(location)}>
                    <span className="w-1/2">{location.LocationName}</span>
                    <span className="w-1/4 text-center">{`${formatTo12(location.ShiftFrom)} to ${formatTo12(location.ShiftTo)}`}</span>
                    <span className="w-1/4 text-right">{`₹${location.DeliveryCharge}`}</span>
                  </div>
                </>
              ))
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-3 w-full max-w-6xl">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#404040] p-4 rounded-lg shadow-lg animate-pulse"
                  >
                    <div className="w-full h-5 bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupPopup;
