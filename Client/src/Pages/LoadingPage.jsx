import React, { useState, useEffect } from "react";

const LoadingPage = () => {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    let dotCount = 0;
    const timer = setInterval(() => {
      setMessage(`Loading${".".repeat(dotCount % 4)}`);
      dotCount++;
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="flex flex-col items-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
        </svg>
        <p className="text-lg font-medium text-gray-900">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
