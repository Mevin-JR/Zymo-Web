import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const CancellationPolicy = () => {
    return (
        <>
        <NavBar/>
        <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
      <div className="max-w-4xl  p-8">
        <h1 className="text-2xl font-bold text-[#faffa4] mb-6">Cancellation Policy</h1>
        <hr />
        <br />
         <p className=" mb-4">
        At Zymo, we strive to provide a seamless and transparent experience for all our users. Please note that the cancellation policy for bookings on our platform varies based on the vendor selected at the time of booking. Since different vendors have distinct policies regarding cancellations, refunds, and charges, it is important to carefully review the specific terms associated with your chosen vendor. For accurate and up-to-date information on the applicable cancellation policy for your booking, we encourage you to refer to the Zymo mobile app. All relevant details, including refund timelines and any applicable cancellation fees, will be clearly stated within the app for your convenience. We appreciate your understanding and look forward to serving you. If you have any further questions or need assistance, please feel free to reach out to our support team. Thank you for choosing Zymo! Download Zymo Mobile App.
        </p>
      </div>
    </div>
    <Footer/>
        </>
     
    )
}

export default CancellationPolicy
