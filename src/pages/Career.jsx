import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Career = () => {
    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
                <div className="max-w-4xl  bg-[#303030] rounded-lg shadow-lg p-8 px-9 ">
                    Carrer
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Career;
