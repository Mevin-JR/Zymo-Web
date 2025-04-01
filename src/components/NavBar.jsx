import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import useTrackEvent from "../hooks/useTrackEvent";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const trackEvent = useTrackEvent();

    // Navigation Links
    const NavBarLinks = [
        { path: "/about-us", label: "About Us" },
        { path: "/blogs", label: "Blogs" },
        { path: "/career", label: "Career" },
        { path: "/contact-us", label: "Contact Us" },
    ];

    // Google Analytics Event Tracking Function
    const handleNavClick =(label)=>{
        trackEvent("Navigation Bar","Navbar Link Clicked",label);

    }

    return (
        <nav className="bg-[#212121] text-white p-4 relative z-50 w-full">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" onClick={() => handleNavClick("Home")}>
                    <img
                        src="/images/AppLogo/zymo2.jpg"
                        alt="zymologo"
                        className="h-14 mix-blend-screen"
                    />
                </Link>

                {/* Hamburger Button */}
                <button
                    className="md:hidden z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu (Sidebar) */}
                <div
                    className={`fixed top-0 right-0 w-2/3 h-full bg-darkGrey text-[#faffa4] shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out md:hidden`}
                >
                    <ul className="mt-16 space-y-6 text-lg px-8">
                        {NavBarLinks.map(({ path, label }) => (
                            <li key={label} className="hover:text-[#faffa4]">
                                <Link to={path} onClick={() => handleNavClick(label)}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/profile" onClick={() => handleNavClick("Profile")}>
                                <IoPersonCircleOutline size={24} className="text-[#faffa4] cursor-pointer" />
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-sm">
                    {NavBarLinks.map(({ path, label }) => (
                        <li key={label} className="hover:text-[#faffa4]">
                            <Link to={path} onClick={() => handleNavClick(label)}>
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li className="text-[#faffa4] cursor-pointer">
                        <Link to="/profile" onClick={() => handleNavClick("Profile")}>
                            <IoPersonCircleOutline size={24} />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
