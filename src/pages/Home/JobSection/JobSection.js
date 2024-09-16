import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "../../../api/apiSlice";
import JobCard from "../../../components/JobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const JobSection = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading, isError, error } = useGetJobsQuery();

  const handleLoadMore = () => {
    navigate("/jobs");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.toString()}</p>;

  // Display only the first 4 jobs
  const displayedJobs = jobs.slice(0, 4);

  return (
    <div className="p-4 bg-gray-100 mt-6">
      <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
      <div className="flex overflow-x-auto space-x-4">
        {displayedJobs.map((job) => (
          <div key={job.id} className="flex-shrink-0">
            <JobCard job={job} />
          </div>
        ))}
        <button onClick={handleLoadMore}>
          <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-800 rounded-full bg-white text-gray-800 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out animate-fadeIn">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default JobSection;
