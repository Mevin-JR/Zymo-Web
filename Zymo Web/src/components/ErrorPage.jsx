import React from 'react';

const ErrorPage = () => {
  return (
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
  );
};

export default ErrorPage;
