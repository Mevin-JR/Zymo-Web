import React, { useState } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const CareerForm = () => {
    const [selectedType, setSelectedType] = useState("Internship");

    return (
        <>
            <NavBar></NavBar>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[darkGrey2] text-white">
                <h1 className="text-2xl font-bold text-[#faffa4] mb-6">
                    “Join Us”
                </h1>
                <p className="text-gray-450 mb-6">Choose your adventure.</p>

                {/* Internship and Full-time Buttons */}
                <div className="flex space-x-4">
                    <button
                        className={`px-6 py-2 text-black font-semibold rounded-lg transition duration-300 ${
                            selectedType === "Internship"
                                ? "bg-[#faffa4]"
                                : "bg-gray-300"
                        }`}
                        onClick={() => setSelectedType("Internship")}
                    >
                        Internship
                    </button>
                    <button
                        className={`px-6 py-2  text-black font-semibold rounded-lg transition duration-300 ${
                            selectedType === "Full-time"
                                ? "bg-[#faffa4] text-black"
                                : "bg-gray-300"
                        }`}
                        onClick={() => setSelectedType("Full-time")}
                    >
                        Full-time
                    </button>
                </div>

                {/* Form Section */}
                <div className="bg-[#363636] shadow-lg rounded-lg p-6 mt-6 w-96 text-black ">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                        required:true
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                        required:true
                    />
                    <input
                        type="text"
                        placeholder="City"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                        required:true
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                        required:true
                    />
                    <input
                        type="text"
                        placeholder="Aspirations"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                        required:true
                    />
                    {/* Primary Skill Dropdown */}
                    <label className="block font-semibold text-gray-100 mb-2">
                        Pick your superpower from the dropdown
                    </label>
                    <select className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none">
                        <option>Select Primary Skill</option>
                        <option>Coding</option>
                        <option>Marketing</option>
                        <option>Design</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>HR</option>
                        <option>Others</option>
                    </select>

                    {/* Skills Textarea */}
                    <label className="block font-semibold text-gray-100 mb-2">
                        Flaunt your skills in the "Tell us why we need you"
                        box—impress us with your flair!
                    </label>
                    <textarea
                        placeholder="write here.."
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none"
                    />

                    {/* Upload Resume */}
                    <label className="block font-semibold text-gray-100 mb-2">
                        Upload Your Resume
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="w-full p-3 mb-4 bg-gray-200 rounded-lg cursor-pointer focus:outline-none"
                    />

                    {/* Expected Stipend Dropdown */}
                    <label className="block font-semibold text-gray-100 mb-2">
                        What kind of stipend do you expect?
                    </label>
                    <select className="w-full p-3 mb-4 bg-gray-200 rounded-lg focus:outline-none">
                        <option>Expected Stipend</option>
                        <option>Paid</option>
                        <option>Unpaid</option>
                    </select>

                    {/* Submit Button */}
                    <p className="text-center text-gray-100 font-semibold mb-4">
                        Hit that submit button like a boss and cross your
                        fingers for a reply!
                    </p>
                    <button className="w-full bg-[#faffa4] text-black py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#faffa4]-700">
                        Submit Application
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default CareerForm;
