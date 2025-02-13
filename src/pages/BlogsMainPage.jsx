import React from "react";
import BlogCard from "./BlogCard";

const dummyBlogs = [
  {
    id: 1,
    title: "Discover the Renault Duster: The Ultimate SUV Experience",
    description:
      "Explore the Renault Duster's exceptional features, performance, and versatility...",
    image:
      "public/images/Cars/crv.jpeg",
    category: "Cars",
  },
  {
    id: 2,
    title: "Navigating India’s Roads: Budget-Friendly Self-Drive Rentals",
    description:
      "Discover budget-friendly self-drive car rentals in India with Zymo...",
    image:
      "public/images/Cars/crv.jpeg",
    category: "Travel",
  },
  {
    id: 3,
    title: "Discover the Maruti Suzuki Dzire: A Blend of Style & Performance",
    description:
      "Explore the Maruti Suzuki Dzire's features, specifications...",
    image:
      "public/images/Cars/crv.jpeg",
    category: "Cars",
  },
];

const BlogsMainPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#faffa4] mb-6 text-center">
        <span className="text-blue-600">“</span> Blog <span className="text-blue-600">”</span>
      </h1>
      <p className="text-center text-gray-300">
        India's Largest Aggregator For Self Drive Car Rental
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {dummyBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsMainPage;
