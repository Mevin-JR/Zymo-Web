import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
        <div className="text-white p-8 flex flex-wrap justify-around text-left">
            {/* Contact Section */}
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg mb-2 text-[#faffa4]">
                    Zymo
                </div>
                <p>Contact:</p>
                <p>
                    Email:{" "}
                    <a
                        href="mailto:hello@zymo.app"
                        className="hover:text-[#faffa4]"
                    >
                        hello@zymo.app
                    </a>
                </p>
                <p>
                    Phone:{" "}
                    <a href="tel:9987933348" className="hover:text-[#faffa4]">
                        +91 9987933348
                    </a>
                </p>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg mb-2">About</div>
                <Link to="/about-us" className="hover:text-[#faffa4]">
                    About Us
                </Link>
                <Link to="/contact-us" className="hover:text-[#faffa4]">
                    Contact Us
                </Link>
                <Link to="/career" className="hover:text-[#faffa4]">
                    Career
                </Link>
            </div>

            {/* Features Section */}
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg mb-2">Features</div>
                <Link to="/blogs" className="hover:text-[#faffa4]">
                    Blogs
                </Link>
                <Link to="/privacypolicy" className="hover:text-[#faffa4]">
                    Privacy Policy
                </Link>
                <Link to="/termsofservice" className="hover:text-[#faffa4]">
                    Terms of Service
                </Link>
                <Link to="/cancellationpolicy" className="hover:text-[#faffa4]">
                    Cancellation Policy
                </Link>
            </div>

            {/* Install App Section */}
            <div className="flex flex-col gap-2">
                <div className="font-bold text-lg mb-2">Install App</div>
                <p>From App Store or Google Play</p>
                <div className="flex gap-4 mt-2">
                    <a
                        href="https://play.google.com/store/apps/details?id=com.letzrent.letzrentnew&referrer=utm_source%3Dplaystore%26utm_medium%3Dreferral%26utm_campaign%3Dapp_launch"
                        target="_blank"
                    >
                        <img
                            src="/images/Footer/gplay.png"
                            alt="Google Play"
                            className="w-32 h-10 "
                        />
                    </a>
                    <a
                        href="https://apps.apple.com/in/app/zymo-self-drive-car-rental/id1547829759?utm_source=apple_ios&utm_medium=referral&utm_campaign=app_launch"
                        target="_blank"
                    >
                        <img
                            src="/images/Footer/istore.png"
                            alt="App Store"
                            className="w-32 h-10"
                        />
                    </a>
                </div>
                <p>Secured Payment Gateway</p>
                <div className="flex gap-4 mt-2">
                    <img
                        src="/images/Footer/visa.jpg"
                        alt="Visa"
                        className="w-10 h-6"
                    />
                    <img
                        src="/images/Footer/mcrd.jpg"
                        alt="Mastercard"
                        className="w-10 h-6"
                    />
                    <img
                        src="/images/Footer/msto.jpg"
                        alt="Maestro"
                        className="w-10 h-6"
                    />
                </div>
            </div>

            {/* Social Media Section */}
            <div className="w-full text-center mt-6">
                <div className="font-bold text-lg mb-2">Follow Us</div>
                <div className="flex justify-center gap-6">
                    <a
                        href="https://www.facebook.com/zymo.official/"
                        target="_blank"
                        className="text-[#faffa4] hover:text-[#faffa4]"
                    >
                        <Facebook size={30} />
                    </a>
                    <a
                        href="https://x.com/zymoapp"
                        target="_blank"
                        className="text-[#faffa4] hover:text-[#faffa4]"
                    >
                        <Twitter size={30} />
                    </a>
                    <a
                        href="https://www.instagram.com/zymo.app/"
                        target="_blank"
                        className="text-[#faffa4] hover:text-[#faffa4]"
                    >
                        <Instagram size={30} />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/zymoapp?originalSubdomain=in"
                        target="_blank"
                        className="text-[#faffa4] hover:text-[#faffa4]"
                    >
                        <Linkedin size={30} />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCHUvrPwNYxw7bukWFjhNpag"
                        target="_blank"
                        className="text-[#faffa4] hover:text-[#faffa4]"
                    >
                        <Youtube size={30} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
