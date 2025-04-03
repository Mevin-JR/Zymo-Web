import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ title }) => {

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Oops! The page you are looking for does not exist." />
        <link rel="canonical" href="https://zymo.app/404" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Oops! The page you're trying to access isn't available." />
      </Helmet>


      <div className="flex flex-col items-center justify-center h-screen0 text-white">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 left-5 p-2 bg-transparent border-none cursor-pointer text-white"
        >
          <ArrowLeft size={30} />
        </button>

        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/404.png"
            alt="error"
            className="w-[300px] md:w-[400px] lg:w-[500px] max-w-full"
          />
          <h1 className="text-2xl md:text-3xl font-bold mt-4">404 - Page Not Found</h1>
        </div>
      </div>


    </>
  );
};

export default ErrorPage;
