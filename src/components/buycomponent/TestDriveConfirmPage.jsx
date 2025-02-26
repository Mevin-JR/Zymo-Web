import { useLocation  } from 'react-router-dom';
import { useEffect,useCallback } from 'react';


const TestDriveConfirmPage = () => {
  const location = useLocation();
  const { car, userData } = location.state || {};  
  
  const functionsUrl = import.meta.env.VITE_FUNCTIONS_API_URL;

  const sendWhatsAppMessage = useCallback(async (bookingData) => {
    try {
      const response = await fetch(`${functionsUrl}/test-drive-whatsapp-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingData }),
      });

      const data = await response.json();
      console.log("WhatsApp Message Response:", data);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }
  },[functionsUrl]);

  useEffect(() => {
    if (car && userData) {
      const bookingData = { ...car, ...userData }; 
      
      // if (bookingData) {
      //   sendWhatsAppMessage(bookingData);  
      // }
    }
  }, [car, userData,sendWhatsAppMessage]);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212121]">
      <div className="w-full max-w-md p-6 bg-[#212121] border rounded-lg shadow-lg border-[#faffa4] text-center">
        <h2 className="text-xl font-semibold text-[#faffa4] mt-3">
          Your Test Drive Has Been Confirmed! 🚗
        </h2>
        <p className="text-gray-200 mt-2">
          Thank you for booking a test drive with <b>Zymo</b>. We have scheduled
          your appointment, and you will receive further details soon.
        </p>
        <p className="text-gray-200 mt-2">
          🚀 Get ready to experience your car on real roads!
        </p>
        <p className="text-gray-200 font-medium mt-4">
          📅 Check your email for confirmation details.
        </p>
      </div>
    </div>
  );
};

export default TestDriveConfirmPage;
