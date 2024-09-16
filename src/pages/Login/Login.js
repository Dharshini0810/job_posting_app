import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side: For Job Seekers */}
      <div className="w-1/2 bg-blue-100 flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          For Job Seekers
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Explore thousands of job opportunities and find the one that's right
          for you.
        </p>
        <Link
          to="user"
          className="flex items-center justify-between w-40 px-4 py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <span className="ml-2">Login</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        <Link
          to="/signup/user"
          className="flex items-center justify-between w-40 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <span className="ml-2">Sign Up</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Right Side: For Companies */}
      <div className="w-1/2 bg-green-100 flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">For Companies</h2>
        <p className="text-gray-600 mb-8 text-center">
          Post job listings and connect with qualified candidates to fill your
          open positions.
        </p>
        <Link
          to="company"
          className="flex items-center justify-between w-40 px-4 py-2 mb-4 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          <span className="ml-2">Login</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        <Link
          to="/signup/company"
          className="flex items-center justify-between w-40 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          <span className="ml-2">Sign Up</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Outlet for Nested Routes */}
      <Outlet />
    </div>
  );
};

export default Login;
