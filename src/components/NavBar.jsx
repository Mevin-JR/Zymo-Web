import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#212121] text-white p-4 relative z-50 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#faffa4]">Zymo</h1>

                {/* Hamburger Button */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X className="w-6 h-6 " />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu (Right Sidebar) */}
                <div
                    className={`fixed top-0 right-0 w-2/3 h-full bg-darkGrey text-[#faffa4] shadow-lg transform ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden`}
                >
                    <ul className="mt-16 space-y-6 text-lg px-8">
                        <li>
                            <a
                                href="#fleet"
                                className="block hover:text-gray-600"
                            >
                                Fleet
                            </a>
                        </li>
                        <li>
                            <a
                                href="#aboutus"
                                className="block hover:text-gray-600"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#blogs"
                                className="block hover:text-gray-600"
                            >
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a
                                href="#careers"
                                className="block hover:text-gray-600"
                            >
                                Careers
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contactus"
                                className="block hover:text-gray-600"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-sm">
                    <li>
                        <a href="#fleet" className="hover:text-gray-400">
                            Fleet
                        </a>
                    </li>
                    <li>
                        <a href="#aboutus" className="hover:text-gray-400">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#blogs" className="hover:text-gray-400">
                            Blogs
                        </a>
                    </li>
                    <li>
                        <a href="#careers" className="hover:text-gray-400">
                            Careers
                        </a>
                    </li>
                    <li>
                        <a href="#contactus" className="hover:text-gray-400">
                            Contact Us
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
