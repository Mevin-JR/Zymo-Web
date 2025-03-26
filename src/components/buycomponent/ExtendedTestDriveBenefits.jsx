import React from 'react'
import { Helmet } from "react-helmet-async";
const ExtendedTestDriveBenefits = () => {
  return (
    <>
        <Helmet>
            <title>Extended Test Drive Benefits - Zymo</title>
        </Helmet>
        
       <div className=" mt-2 w-[85%] p-4 bg-[#2d2d2d] border border-[#faffa4] rounded-lg shadow-lg text-sm text-gray-200 ">
          <p className="font-bold text-2xl text-white text-center mb-4">Benefits of Extended Test Drive with Zymo</p>
          <ul className="mt-2 space-y-2">
            <li>🚗 <b>Experience the Car in Real Life</b> – Drive it on your daily routes, not just for a few minutes at a showroom.</li>
            <li>🛣 <b>Test Comfort & Performance</b> – See how the car feels on long drives, in traffic, or on highways.</li>
            <li>💰 <b>Make a Confident Decision</b> – No more guessing! Be sure about your choice before investing.</li>
            <li>⚡ <b>Try Before You Buy</b> – Drive for hours, days, or weeks to know if the car truly fits your lifestyle.</li>
            <li>🔄 <b>Compare Multiple Cars</b> – Not sure which one is right? Test different models before making your pick.</li>
          </ul>
          <p className="mt-3 font-semibold text-[#faffa4] text-center">Book Your Extended Test Drive with Zymo & Buy with Confidence!</p>
        </div>
    </>
  )
}

export default ExtendedTestDriveBenefits
