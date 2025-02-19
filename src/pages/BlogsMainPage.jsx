import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { collection, getDocs } from "firebase/firestore";
import { webDB } from "../utils/firebase";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const BlogsMainPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBlogs = async () => {
        const blogsCollection = collection(webDB, "blogs");
        const blogsSnapshot = await getDocs(blogsCollection);

        const blogsData = blogsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setBlogs(blogsData);
        sessionStorage.setItem("blogs", JSON.stringify(blogsData));
        setLoading(false);
    };

    useEffect(() => {
        if (sessionStorage.getItem("blogs")) {
            setBlogs(JSON.parse(sessionStorage.getItem("blogs")));
            setLoading(false);
            return;
        }
        getBlogs();
    }, []);
    return (
        <>
            <NavBar />
            <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-[#faffa4] mb-6 text-center">
                    <span className="text-blue-600">“</span> Blog{" "}
                    <span className="text-blue-600">”</span>
                </h1>
                <p className="text-center text-gray-300">
                    India's Largest Aggregator For Self Drive Car Rental
                </p>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-6">
                        {[...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-[#404040] p-4 rounded-lg shadow-lg animate-pulse"
                            >
                                <div className="w-full h-40 bg-gray-700 rounded-lg"></div>
                                <div className="mt-3 h-5 bg-gray-600 w-3/4 rounded"></div>
                                <div className="mt-2 h-4 bg-gray-500 w-1/2 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {blogs.flat().map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogsMainPage;
