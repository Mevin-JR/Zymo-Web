import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const ErrorPage = ({ title }) => {
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
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#333', 
      color: '#fff', 
      fontSize: '2rem', 
      fontWeight: 'bold' 
    }}>
      404 - Page Not Found
    </div>
    </>
  );
};

export default ErrorPage;
