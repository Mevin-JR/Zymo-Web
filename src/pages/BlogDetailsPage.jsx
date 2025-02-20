import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const BlogDetailPage = () => {
    const { title } = useParams();
    const blogs = JSON.parse(sessionStorage.getItem("blogs"));
    const blog = blogs.find((blog) => blog.title === title);

    const navigate = useNavigate();
    if (!blog) {
        toast.error("Blog not found", {
            position: "top-center",
            autoClose: 1000 * 5,
        });
        navigate("/blogs");
        return;
    }

    const htmlParser = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        return doc.body.innerHTML;
    };

    return (
        <>
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <img
                    src={blog.cover}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg"
                />
                <h1 className="text-3xl font-bold mt-4 text-white">
                    {blog.title}
                </h1>
                <p
                    className="text-gray-100 mt-2"
                    dangerouslySetInnerHTML={{
                        __html: htmlParser(blog.description),
                    }}
                />
            </div>
            <Footer />
        </>
    );
};

export default BlogDetailPage;
