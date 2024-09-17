import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate(); // Import useNavigate hook for navigation
  const currentDate = new Date();

  const calculateStatus = (lastDateOfRegistration) => {
    const lastDate = new Date(lastDateOfRegistration);
    const differenceInDays = (lastDate - currentDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 0) {
      return "Closed";
    }
    return "Open";
  };

  const handleKnowMore = () => {
    // Navigate to detailed job page
    navigate(`/jobs/${job.id}`);
  };

  const calculateTimeOfPost = (datePosted) => {
    const postingDate = new Date(datePosted);
    const diffInMs = currentDate - postingDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    return `few seconds ago`;
  };

  const status = calculateStatus(job.lastDateOfRegistration);

  const statusColors = {
    Open: {
      text: "text-green-600",
      bg: "bg-green-100",
    },
    Closed: {
      text: "text-red-600",
      bg: "bg-red-100",
    },
  };

  const currentStatus = statusColors[status];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-4 space-y-4 max-w-sm mx-auto">
      {/* First Row: Title and Company */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-gray-600 text-sm md:text-base mt-1">{job.company}</p>
        </div>
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
        />
      </div>

      {/* Second Row: Location, Salary, Experience */}
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 text-gray-600 text-sm md:text-base font-serif">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faMapMarkedAlt} className="text-gray-800" />
          <p className="text-xs">{job.location}</p>
        </div>
        <p className="md:ml-4 text-xs">{`Salary: ${job.salary}`}</p>
        <p className="md:ml-4 text-xs">{`Experience: ${job.experience}`}</p>
      </div>

      {/* Third Row: Description */}
      <div className="text-gray-700 text-sm md:text-base mt-2">
        <p>{job.description}</p>
      </div>

      {/* Fourth Row: Time and Status */}
      <div className="flex justify-between items-center text-gray-600 text-sm md:text-base mt-4">
        <p>{calculateTimeOfPost(job.datePosted)}</p>
        <div
          className={`flex items-center ${currentStatus.bg} p-1 md:p-2 rounded-full`}
        >
          <p className={`font-semibold ${currentStatus.text}`}>{status}</p>
        </div>
      </div>

      <div>
        <button
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 text-sm md:text-base"
          type="button"
          onClick={handleKnowMore} // Use function reference here
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
