import React from "react";
import { useParams } from "react-router-dom";

const dummyBlogs = [
  {
    id: 1,
    title: "Discover the Renault Duster: The Ultimate SUV Experience",
    description:
      "Explore the Renault Duster's exceptional features, performance, and versatility...",
    content:
      "Full blog content about Renault Duster...",
    image:
      "../public/images/Cars/crv.jpeg",
    category: "Cars",
  },
  {
    id: 2,
    title: "Navigating India’s Roads: Budget-Friendly Self-Drive Rentals",
    description:
      "Discover budget-friendly self-drive car rentals in India with Zymo...",
    content:
      "Full blog content about self-drive rentals..",
    image:
      "../public/images/Cars/nexon.jpeg",
    category: "Travel",
  },
  {
    id: 3,
    title: "Navigating India’s Roads: Budget-Friendly Self-Drive Rentals",
    description:
      "Discover budget-friendly self-drive car rentals in India with Zymo...",
    content:
      "Full blog content about self-drive rentals..",
    image:
      "../public/images/Cars/nexon.jpeg",
    category: "Travel",
  },
];

const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = dummyBlogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <h2 className="text-center text-red-500">Blog not found</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4 text-white">{blog.title}</h1>
      <p className="text-gray-100 mt-2">{blog.content}</p>
    </div>
  );
};

export default BlogDetailPage;
