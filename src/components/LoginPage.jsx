import { useState } from "react";
import { appAuth } from "../utils/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const LoginPage = ({ onAuth, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const googleProvider = new GoogleAuthProvider();

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

    const closePopup = () => {
        const user = appAuth.currentUser;
        onAuth(user);
        onClose();
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(appAuth, email, password);
                successMessage("Login successful!");
            } else {
                await createUserWithEmailAndPassword(appAuth, email, password);
                successMessage("Account created successfully!");
            }
            closePopup();
        } catch (error) {
            errorMessage(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(appAuth, googleProvider);
            successMessage("Google sign-in successful!");
            closePopup();
        } catch (error) {
            errorMessage(error.message);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={onClose} // Close when clicking outside the modal
        >
            <div
                className="relative bg-darkGrey text-white p-8 rounded-2xl shadow-xl w-96 border border-[#faffa4]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
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
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <button
                        className="text-[#faffa4] font-semibold ml-1"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="mt-4 w-full bg-[#ffffff] text-darkGrey py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
