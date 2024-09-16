import React from "react";
import heroImage from '../../../assets/images/heroImage.png'
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();

  const handleClickUser = () => {
    navigate('/login/user');
  };

  const handleClickCompany = () =>{
    navigate('/login/company');
  }

  return (
    <div className="w-full bg-gray-100 h-screen flex items-center justify-center pt-16 md:pt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/*Left Column:Content*/}
        <div className="flex flex-col items-start space-y-6 md:w-1/2 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Find Your Dream Job</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Explore thousands of job opportunities tailored for you.
          </p>
          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded transition duration-300 " onClick={handleClickUser}>
              Find Jobs
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded transition duration-300" onClick={handleClickCompany}>
              Post Jobs
            </button>
          </div>
        </div>
        {/* Right Column:Image */}
        <div className="mt-10 md:mt-0 md:w-1/2 ">
          <img
            src={heroImage}
            alt="Job Search"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
