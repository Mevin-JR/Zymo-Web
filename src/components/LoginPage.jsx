import React, { useState } from "react";
import { appAuth } from "../utils/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const LoginPage = ({ onAuth, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Toast notification helpers
    const successMessage = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 1000,
        });
    };

    const errorMessage = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
        });
    };

    // Handle authentication (login or sign up)
    const handleAuth = async (e) => {
        e.preventDefault();
        setMessage("");

        // Trim inputs to remove leading/trailing spaces
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Basic validation
        if (!trimmedEmail || !trimmedPassword) {
            errorMessage("Email and password are required.");
            return;
        }

        try {
            if (isLogin) {
                // Login flow
                await signInWithEmailAndPassword(appAuth, trimmedEmail, trimmedPassword);
                // Extra security: Verify email domain after login
                if (!trimmedEmail.endsWith("@company.com")) {
                    await appAuth.signOut();
                    errorMessage("Only company agents can log in.");
                    return;
                }
                successMessage("Login successful!");
            } else {
                // Sign up flow
                if (!trimmedEmail.endsWith("@company.com")) {
                    errorMessage("Only company agents can sign up.");
                    return;
                }
                if (trimmedPassword.length < 6) {
                    errorMessage("Password must be at least 6 characters long.");
                    return;
                }
                await createUserWithEmailAndPassword(appAuth, trimmedEmail, trimmedPassword);
                successMessage("Account created successfully!");
            }
            // Pass the authenticated user to the parent component and close the modal
            const user = appAuth.currentUser;
            onAuth(user);
            onClose();
        } catch (error) {
            errorMessage(error.message);
        }
    };

    return (
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

                {message && <p className="text-red-500">{message}</p>}

                <form className="space-y-4" onSubmit={handleAuth}>
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
            </div>
        </div>
    );
};

export default LoginPage;