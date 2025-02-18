import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-black shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 text-white">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <span className="text-xs font-semibold text-white bg-blue-500 px-2 py-1 rounded-full">
                    {blog.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-white hover:text-blue-600 transition">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h2>
                <p className="text-white-600 text-sm mt-1">
                    {blog.description}
                </p>
            </div>
        </div>
    );
};

export default BlogCard;
