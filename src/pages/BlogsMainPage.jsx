import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { collection, getDocs } from "firebase/firestore";
import { webDB } from "../utils/firebase";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const BlogsMainPage = ({ title }) => {
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
        document.title = title;
      }, [title]);
    

    useEffect(() => {
        if (sessionStorage.getItem("blogs")) {
            setBlogs(JSON.parse(sessionStorage.getItem("blogs")));
            setLoading(false);
            return;
        }
        getBlogs();
    }, []);

    const refreshBlogs = () => {
        setLoading(true);
        getBlogs().then(() => setLoading(false));
    }

    return (
        <>
           <Helmet>
           <title>{title}</title>
                <meta name="description" content="Read the latest blogs on car rentals, driving tips, and vehicle trends at Zymo." />
                <meta property="og:title" content={title} />
        <meta property="og:description" content="Stay updated with Zymo's latest blogs on travel, car rentals, and industry trends." />
                <link rel="canonical" href="https://zymo.app/blogs" />
            </Helmet>
            <NavBar />
            <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-[#faffa4] mb-6 text-center">
                    <span className="text-blue-600">“</span> Blog{" "}
                    <span className="text-blue-600">”</span>
                </h1>
                <div className="relative w-full flex flex-row">
                    <p className="text-gray-300 absolute left-1/2 -translate-x-1/2">
                        India's Largest Aggregator For Self Drive Car Rental
                    </p>

                    <div className="text-white ml-auto">
                        <button className="rounded-lg bg-[#faffa4] text-black py-1 px-3" onClick={refreshBlogs}>Refresh</button>
                    </div>
                </div>
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
