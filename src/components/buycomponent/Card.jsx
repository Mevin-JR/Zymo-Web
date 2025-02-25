import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ car }) => {
    return (
        <div className="flex flex-col md:flex-row bg-darkGrey2 rounded-2xl p-5 text-white mx-auto w-full max-w-[900px] md:items-center">
            
            {/* Left Section: Car Details */}
            <div className="flex md:flex-col justify-between w-full md:w-1/3 text-center md:text-left">
                <div>
                    <h2 className="text-2xl font-bold">{car.name}</h2>
                    <p className="text-xl">{car.model}</p>
                </div>
                <div className="mt-2">
                    <div className="text-center md:text-start mb-1">
                        <span className="text-xs text-[#faffa4]">&#9733; {car.rating}</span>
                    </div>
                    {/* Vehicle details */}
                    <div className="text-xs text-gray-400 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-1">
                            <i className="fa fa-user-group"></i>
                            <span>{car.passengers} Passengers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-gear"></i>
                            <span>{car.transmission}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Center Section: Car Image */}
            <div className="relative flex items-center justify-center  rounded-xl   p-1 w-full md:w-auto mt-4 md:mt-0">
                <img
                    src={car.image}
                    alt={car.name}
                    className="h-auto object-contain rounded-xl w-full md:w-auto max-h-40 "
                />
            </div>

            {/* Right Section: Price & CTA */}
            <div className="flex md:flex-col items-center md:items-end text-center md:text-right justify-between w-full md:w-1/3 mt-4 md:mt-0">
                <div>                    
                    <div className=''>
                    <p className="text-md font-semibold">Rs.{car.price} L* </p>
                    <p className="text-xs text-gray-400">onwards</p>
                    </div>
                    
                    {/* <p className="text-xs text-gray-400">Avg. Ex-Showroom price</p> */}
                    <p className="text-xs text-[#faffa4]">t&c apply</p>
                </div>
                <Link to={`/buy/car-details/${car.id}`} className="mt-3">
                    <button className="w-10 h-10 rounded-lg bg-[#faffa4] flex items-center justify-center hover:bg-[#dff566] transition-colors">
                        <i className="fa-solid fa-arrow-right text-darkGrey2"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
