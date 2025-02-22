import React, { useState } from 'react';
import { carData } from "../../api/NewCarData";
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TestDrivePopup from '../../components/buycomponent/TestDrivePopup';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTestDrivePopupOpen, setIsTestDrivePopupOpen] = useState(false);

  // Finding car from carData based on the id from URL
  const carDetail = carData.find((car) => car.id === parseInt(id));

  if (!carDetail) {
    return <div>No car found</div>;
  }

  // Destructuring car details for easier use
  const { name, model, rating, range, battery, power, charging, bodyStyle, warranty, length, width, height, cargoVolume, price, image, about } = carDetail;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-3 bg-darkGrey text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Main Content */}
        <div className="max-w-6xl w-full bg-darkGrey rounded-lg shadow-lg overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden md:flex">
            {/* Image Section */}
            <div className="w-1/2 flex justify-center items-center bg-darkGrey p-6">
              <img
                src={image}
                alt={`${name} ${model}`}
                className="w-3/4 rounded-lg shadow-md"
              />
            </div>
            {/* Details Section */}
            <div className="w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-2">{`${name} ${model}`}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-[#e8ff81] text-xl">&#9733; {rating}</span>
              </div>

              {/* Key Features Section */}
              <div className="p-3">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Key Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-darkGrey2 p-3 rounded-lg">
                    <div className="box flex items-center gap-5">
                      <i className="fa-solid fa-car text-lg text-gray-300 pl-2"></i>
                      <div>
                        <p className="font-semibold text-gray-300">Range</p>
                        <p className="text-lg">{range}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-darkGrey2 p-3 rounded-lg">
                    <div className="box flex items-center gap-5">
                      <i className="fa-solid fa-battery-full text-lg text-gray-300 pl-2"></i>
                      <div>
                        <p className="font-semibold text-gray-300">Battery</p>
                        <p className="text-lg">{battery}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-darkGrey2 p-3 rounded-lg">
                    <div className="box flex items-center gap-5">
                      <i className="fa-solid fa-plug text-lg text-gray-300 pl-2"></i>
                      <div>
                        <p className="font-semibold text-gray-300">Power</p>
                        <p className="text-lg">{power}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-darkGrey2 p-3 rounded-lg">
                    <div className="box flex items-center gap-5">
                      <i className="fa-solid fa-stopwatch text-lg text-gray-300 pl-2"></i>
                      <div>
                        <p className="font-semibold text-gray-300">Charging</p>
                        <p className="text-lg">{charging}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specifications Section */}
              <h2 className="text-xl font-semibold text-white mb-4 p-3">Specifications</h2>
              <ul className="space-y-2 mb-4 px-3">
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Body Style :</span>
                  <span>{bodyStyle}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Warranty :</span>
                  <span>{warranty}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Length :</span>
                  <span>{length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Width :</span>
                  <span>{width}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Height :</span>
                  <span>{height}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Cargo Volume :</span>
                  <span>{cargoVolume}</span>
                </li>
              </ul>

              {/* About Section */}
              <div className="about border border-[#e8ff81] p-3 rounded-lg my-4">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">About {model}</h2>
                <p className="text-gray-400 mb-4">{about}</p>
              </div>

              {/* Price and Test Drive Button */}
              <p className="text-2xl font-bold text-gray-300 m-4">Starts at {price}</p>
              <button
                className="bg-[#e8ff81] text-darkGrey px-6 py-3 rounded-lg font-semibold hover:bg-[#e8ff88]"
                onClick={() => setIsTestDrivePopupOpen(true)}
              >
                Book Test Drive
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Image and Title Section */}
            <div className="bg-darkGrey flex flex-col items-center p-3">
              <img
                src={image}
                alt={`${name} ${model}`}
                className="w-3/4 rounded-lg shadow-md"
              />
              <div className="name-rating flex justify-between items-center px-3 mt-4">
                <h1 className="text-3xl font-bold">{`${name} ${model}`}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-[#e8ff81] text-lg bg-darkGrey2 px-1 rounded-lg">&#9733; {rating}</span>
                </div>
              </div>
            </div>

            {/* Key Features Section */}
            <div className="p-3">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">Key Features</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-darkGrey2 p-3 rounded-lg">
                  <div className="box flex items-center gap-3">
                    <i className="fa-solid fa-car"></i>
                    <div>
                      <p className="font-semibold text-gray-300">Range</p>
                      <p className="text-lg">{range}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-darkGrey2 p-3 rounded-lg">
                  <div className="box flex items-center gap-3">
                    <i className="fa-solid fa-battery-full"></i>
                    <div>
                      <p className="font-semibold text-gray-300">Battery</p>
                      <p className="text-lg">{battery}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-darkGrey2 p-3 rounded-lg">
                  <div className="box flex items-center gap-3">
                    <i className="fa-solid fa-plug"></i>
                    <div>
                      <p className="font-semibold text-gray-300">Power</p>
                      <p className="text-lg">{power}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-darkGrey2 p-3 rounded-lg">
                  <div className="box flex items-center gap-3">
                    <i className="fa-solid fa-stopwatch"></i>
                    <div>
                      <p className="font-semibold text-gray-300">Charging</p>
                      <p className="text-lg">{charging}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="p-3 bg-darkGrey">
              <h2 className="text-xl font-semibold text-white mb-4">Specifications</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Body Style :</span>
                  <span>{bodyStyle}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Warranty :</span>
                  <span>{warranty}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Length :</span>
                  <span>{length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Width :</span>
                  <span>{width}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Height :</span>
                  <span>{height}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold text-gray-300">Cargo Volume :</span>
                  <span>{cargoVolume}</span>
                </li>
              </ul>
            </div>

            {/* About Section */}
            <div className="p-3 bg-darkGrey2 border border-[#e8ff81] rounded-lg mt-4">
              <h2 className="text-xl font-semibold text-gray-300 mb-4">About {model}</h2>
              <p className="text-gray-300">{about}</p>
            </div>

            {/* Price and Test Drive Button */}
            <div className="p-3 bg-darkGrey flex flex-col items-center">
              <p className="text-2xl font-bold mb-4">starts at {price}</p>
              <button
                className="bg-[#e8ff81] text-darkGrey2 px-6 py-3 rounded-lg font-semibold hover:bg-[#e8ff88]"
                onClick={() => setIsTestDrivePopupOpen(true)}
              >
                Book Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Drive Popup */}
      <TestDrivePopup
        isOpen={isTestDrivePopupOpen}
        close={() => setIsTestDrivePopupOpen(false)}
        id={id}
      />
    </>
  );
};

export default CarDetails;