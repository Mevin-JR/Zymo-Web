import { useState } from "react";
import { format, addDays } from "date-fns";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DatePicker = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dates = Array.from({ length: 90 }, (_, i) => addDays(new Date(), i));

  return (
    <div className="min-h-screen bg-[#212121] text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl py-8"
      >
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-1 md:left-5 top-10 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all "
          >
          <ArrowLeft size={30} />
        </button>

        <div className="text-center mb-6 md:mb-10 text-xl md:text-4xl font-bold">
          <span className="text-appColor font-bold mb-8 text-center">Welcome</span> to Extended Test Drive!
        </div>

        <div className="bg-[#212121]  md:bg-[#2A2A2A]  p-6 md:p-8 rounded-xl shadow-xl border border-white/10">
            {/* Date Selection */}
            <div className="mb-6">
              <h2 className="text-xl mb-4">Pick-up Date</h2>
              <div className="bg-darkGrey rounded-lg p-5 border border-white/10">
                  <div className="text-xl mb-4">{format(selectedDate, "MMMM dd, yyyy")}</div>
                  
                  <div className="flex space-x-2 mb-6 pb-2 overflow-x-scroll no-scrollbar ">
                      {dates.map((date) => (
                          <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          className={`flex-shrink-0 w-14 h-16 rounded-lg flex flex-col items-center justify-center transition-all duration-200 border border-white/10 ${
                              selectedDate.toDateString() === date.toDateString()
                              ? "bg-appColor text-black"
                              : "bg-darkGrey2 text-white hover:bg-opacity-70"
                          }`}
                          >
                          <span className="text-xs">{format(date, "MMM")}</span>
                          <span className="text-lg font-semibold">{format(date, "dd")}</span>
                          </button>
                      ))}
                  </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="bg-darkGrey bg-opacity-50 backdrop-blur-lg rounded-xl p-4 mb-8 border-2 border-appColor">
                <h3 className="text-lg mb-2">Booking Info</h3>
                <p className="text-sm text-gray-300">
                    You can select a date now and have to return it exactly 1 month later
                </p>
            </div>


            {/* Next Button */}
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-3 md:p-4 rounded-lg font-semibold text-base md:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-appColor text-black border"
            onClick={() => navigate('/buy/upload-info')}
            >
            Next
            </motion.button>
        </div>
      </motion.div>
    </div>
  );
};


export default DatePicker;
