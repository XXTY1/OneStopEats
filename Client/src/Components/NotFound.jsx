import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({
  message = "Not Found",
  linkRoute = "/",
  linkText = "Go to Home Page",
}) => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold">{message}</h1>
      <Link
        to={linkRoute}
        className="mt-4 text-blue-600 transition duration-300 hover:text-blue-800"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default NotFound;
