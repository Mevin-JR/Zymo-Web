import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExtendedTestDriveBenefits from '../../components/buycomponent/ExtendedTestDriveBenefits';

const carData={
    name: "Nexon EV",
    monthlyFee: 92500,
    securityDeposit: 40000,
    totalAmount:74514,
    freeKm: 1500,
    freekilometers:1200,
    vendor:"MyChoice"
}
const faqs = [
    {
      question: "How do I charge the vehicle at home?",
      answer: "You can charge your vehicle using the provided home charging unit. Installation by a certified electrician is recommended.",
    },
    {
      question: "Can OEM create a charging point for me?",
      answer: "Yes, we can assist in setting up a charging point at your location. Contact our service team for installation.",
    },
    {
      question: "What if the charger is damaged?",
      answer: "If your charger is damaged, please contact our 24/7 support immediately. We'll arrange for repair or replacement under warranty.",
    },
    {
      question: "What is the range for a 100% charged vehicle?",
      answer: "The vehicle has a range of approximately 500 km on a full charge under optimal conditions.",
    },
    {
      question: "What is the range for a 100% charged vehicle?",
      answer: "The vehicle has a range of approximately 500 km on a full charge under optimal conditions.",
    }
];
  

const Summary = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#212121] px-4 md:px-8 animate-fade-in">
      <div className="container mx-auto max-w-4xl py-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-1 md:left-5 top-8 p-2 text-white/80 hover:text-white hover:bg-[#2A2A2A] bg-transparent transition-all"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="ext-test-benf flex justify-center my-3 mb-5">
        <ExtendedTestDriveBenefits/>
        </div>
 
        {/* Summary */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-xl md:text-4xl font-bold text-appColor">
            Summary
          </h1>
        </div>

        <div className="mx-auto mb-5">
          <div className="bg-[#212121] md:bg-[#2A2A2A] backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="mt-4">
                <div className="mt-4 flex justify-center">
                    <img 
                    src="/images/Cars/tnex.jpeg" 
                    alt="Nexon EV"
                    className="w-3/4 border border-white/10 rounded-lg"
                    />
                </div>            
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monthly Test Drive Fee</span>
                    <span className="text-white font-medium">₹ {carData?.monthlyFee}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security Deposit</span>
                    <span className="text-white font-medium">₹ {carData?.securityDeposit}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-gray-300">Total Amount</span>
                    <span className="text-white font-medium">₹ {carData?.totalAmount}</span>
                </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-7">
            <div className="bg-[#212121] md:bg-[#2A2A2A] backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col justify-between items-center">
                        <span className="text-gray-300">Free Kilometers</span>
                        <span className="text-white font-medium">{carData?.freekilometers} Km</span>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <span className="text-gray-300">Vendor</span>
                        <span className="text-white font-medium">{carData?.vendor}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* FAQs */}
        <div className=" mx-auto space-y-4">
          <h2 className="text-[#edff8d] text-xl font-medium mb-6">FAQs</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#212121] md:bg-[#2A2A2A] backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-[#edff8d]/30"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#edff8d] transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-4 text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Next Button */}
        <div className="mt-6 md:mt-8">
            <button
              onClick={() => navigate('/buy/date-picker')}
              className="w-full p-3 md:p-4 rounded-lg font-semibold text-base md:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] bg-appColor text-black border"
            >
              Next
            </button>
        </div>

      </div>
    </div>
  );
};

export default Summary;