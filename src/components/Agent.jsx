import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
export default function Agent({ onClose ,title }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    document.title = title;
}, [title]);

  return (
    <>
  <Helmet>
                <title>{title}</title>
                <meta name="description" content="Login as an authorized agent to access Zymo's partner portal." />
                <link rel="canonical" href="https://zymo.app/agent-login" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content="Secure agent login portal for Zymo partners." />
            </Helmet>
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-darkGrey text-white p-8 rounded-2xl shadow-xl w-96 border border-[#faffa4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-300"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-darkGrey focus:ring-[#faffa4]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-darkGrey focus:ring-[#faffa4]"
          />
          <button
            type="submit"
            className="w-full bg-[#faffa4] text-darkGrey py-2 rounded-lg hover:bg-[#faffa9]"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-[#faffa4] font-semibold ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        {/* Google Sign-In Button */}
        <button className="mt-4 w-full bg-[#ffffff] text-darkGrey py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200">
          Sign in with Google
        </button>
      </div>
    </div>
    </>
  );
}
