import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <div className="text-white p-8 flex flex-wrap justify-around text-left">
      {/* Contact Section */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg mb-2 text-[#faffa4]">Zymo</div>
        <p>Contact:</p>
        <p>Email: <a href="mailto:ar@mail.com" className="hover:text-gray-400">hello@zymo.app</a></p>
        <p>Phone: <a href="tel:98039482934" className="hover:text-gray-400">+91 9987933348</a></p>
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg mb-2">About</div>
        <Link to="/fleet" className="hover:text-gray-400">Fleet</Link>
        <Link to="/about-us" className="hover:text-gray-400">About Us</Link>
        <Link to="/contact-us" className="hover:text-gray-400">Contact Us</Link>
        <Link to="/career" className="hover:text-gray-400">Career</Link>
      </div>

      {/* Features Section */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg mb-2">Features</div>
        <Link to="/blogs" className="hover:text-gray-400">Blogs</Link>
        <Link to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
        <Link to="/terms-of-service" className="hover:text-gray-400">Terms of Service</Link>
        <Link to="/cancellation-policy" className="hover:text-gray-400">Cancellation Policy</Link>
      </div>

      {/* Install App Section */}
      <div className="flex flex-col gap-2">
        <div className="font-bold text-lg mb-2">Install App</div>
        <p>From App Store or Google Play</p>
        <div className="flex gap-4 mt-2">
          <a href="#" target="_blank">
            <img src="/images/Footer/gplay.jpg" alt="Google Play" className="w-32 h-10 "/>
          </a> 
          <a href="#" target="_blank">
            <img src="/images/Footer/istore.jpg" alt="App Store" className="w-32 h-10"/>
          </a>
        </div>
        <p>Secured Payment Gateway</p>
        <div className="flex gap-4 mt-2">
          <a href="#"><img src="/images/Footer/visa.jpg" alt="Visa" className="w-10 h-6"/></a>
          <a href="#"><img src="/images/Footer/mcrd.jpg" alt="Mastercard" className="w-10 h-6"/></a>
          <a href="#"><img src="/images/Footer/msto.jpg" alt="Maestro" className="w-10 h-6"/></a>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="w-full text-center mt-6">
        <div className="font-bold text-lg mb-2">Follow Us</div>
        <div className="flex justify-center gap-6">
          <a href="#" target="_blank" className="text-[#faffa4] hover:text-gray-400"><Facebook size={30} /></a>
          <a href="#" target="_blank" className="text-[#faffa4] hover:text-gray-400"><Twitter size={30} /></a>
          <a href="#" target="_blank" className="text-[#faffa4] hover:text-gray-400"><Instagram size={30} /></a>
          <a href="#" target="_blank" className="text-[#faffa4] hover:text-gray-400"><Linkedin size={30} /></a>
          <a href="#" target="_blank" className="text-[#faffa4] hover:text-gray-400"><Youtube size={30} /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
