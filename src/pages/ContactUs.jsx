import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const ContactUs = () => {
    return (
        <>
        <NavBar/>

            <div className="flex justify-center items-center min-h-screen bg-[darkGrey2] text-white p-6">
                <div className="max-w-4xl  bg-[#303030] rounded-lg shadow-lg p-8 px-9 ">
                    <div className="font-bold text-lg mb-2 text-[#faffa4] text-center">Contact Us</div>
                    <br />
                    <p>Phone: <a href="tel:9987933348" className="hover:text-[#faffa4]">+91 9987933348</a></p>
                    <br />
                    <p>Whatsapp: <a href="tel:9987933348" className="hover:text-[#faffa4]">+91 9987933348</a></p>
                   <br />
                    <p>Email: <a href="mailto:ar@mail.com" className="hover:text-[#faffa4]">hello@zymo.app</a></p>
                </div>
            </div>

            <Footer/>
        </>


    )
}

export default ContactUs
