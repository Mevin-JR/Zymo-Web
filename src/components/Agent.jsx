import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Agent({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();

  return (
    <>
      <NavBar/>
      <button
        onClick={() => navigate("/")}
        className="text-white m-5 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div
        className="fixed inset-0 flex items-center justify-center bg-[#212121] bg-opacity-50 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <div
          className="relative bg-[#1e1e1e] text-white p-8 rounded-2xl shadow-[0_0_15px_rgba(255,255,153,0.4)] w-96 border border-[#faffa4] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,153,0.8)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center tracking-wide uppercase">
            {isLogin ? "Admin Panel" : "Sign Up"}
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#faffa4] rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#faffa4] transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#faffa4] rounded-lg bg-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#faffa4] transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffff99] to-[#ffeb3b] text-darkGrey py-2 rounded-lg font-semibold tracking-wide transform transition hover:scale-105 hover:shadow-lg"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="text-[#faffa4] font-semibold ml-1 transition hover:text-[#ffff99]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>


        </div>
      </div>
      <Footer/>
    </>
  );
}
