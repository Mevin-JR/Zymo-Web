import { Check } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPage = ({ isOpen, close }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
                    <div className="bg-darkGrey2 rounded-lg shadow-lg p-6 w-80 text-center">
                        <div className="font-bold w-16 h-16 bg-[#faffa4] rounded-full flex items-center justify-center mx-auto">
                            <Check />
                        </div>
                        <h2 className="text-xl font-bold mt-4 text-white">
                            Awesome!
                        </h2>
                        <p className="text-white mt-2">
                            Your booking has been confirmed. <br />
                            Check your whatsapp for more details.
                        </p>
                        <button
                            onClick={() => {
                                close;
                                navigate("/#");
                            }}
                            className="bg-[#faffa4] text-darkGrey font-semibold px-6 py-2 rounded-lg mt-4 hover:bg-green-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmPage;
