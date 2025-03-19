import React from "react";

export default function CustomerCard({ customer }) {
  return (
    <div className="bg-darkGrey text-white p-6 rounded-2xl shadow-lg border border-[#faffa4] w-96">
      <h2 className="text-xl font-bold mb-2">{customer.name}</h2>
      <p className="text-sm text-gray-300">Car Type: {customer.carType}</p>
      <p className="text-sm text-gray-300">Car Brand: {customer.carBrand}</p>
      <p className="text-sm text-gray-300">Car Name: {customer.carName}</p>
      <div className="mt-3">
        <p className="text-sm">
          <span className="font-semibold">Booked At:</span> {customer.bookedAt}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Start Date:</span> {customer.startDate}
        </p>
        <p className="text-sm">
          <span className="font-semibold">End Date:</span> {customer.endDate}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Booking Duration:</span> {customer.fromWhen} to{" "}
          {customer.toWhen}
        </p>
        <p className="text-sm">
          <span className="font-semibold">City:</span> {customer.city}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Hourly Amount:</span> {customer.hourlyAmount}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Seats:</span> {customer.seats}
        </p>
        <p className="text-lg font-semibold mt-2 text-[#faffa4]">
          Payable Amount: {customer.payableAmount}
        </p>
      </div>
      <div className="mt-4 p-3 bg-[#2a2a2a] rounded-lg">
        <h3 className="text-lg font-semibold">Customer Details</h3>
        <p className="text-sm text-gray-300">{customer.details}</p>
      </div>
    </div>
  );
}
