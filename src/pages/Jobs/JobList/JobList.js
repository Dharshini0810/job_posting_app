import React, { useState } from "react";
import { useGetJobsQuery } from "../../../api/apiSlice";
import JobCard from "../../../components/JobCard";

const JobList = () => {
  const currentDate = new Date();
  const {
    data: jobs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJobsQuery();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // Job type filter
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [status, setStatus] = useState("all"); // Job status filter

  const calculateStatus = (lastDateOfRegistration) => {
    const lastDate = new Date(lastDateOfRegistration);
    const differenceInDays = (lastDate - currentDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 0) {
      return "Closed";
    }
    return "Open";
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Helper function to parse salary from string
  const parseSalary = (salary) => {
    const match = salary.match(/(\d+)/); // Extract numeric part
    return match ? parseFloat(match[1]) : 0;
  };

  const filteredJobs = jobs?.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === "all" || job.type === filter;
    const jobSalary = parseSalary(job.salary); // Parse job salary

    // Convert min and max salaries to numbers
    const minSalaryValue = minSalary === "" ? 0 : parseFloat(minSalary);
    const maxSalaryValue = maxSalary === "" ? Infinity : parseFloat(maxSalary);

    const matchesMinSalary = jobSalary >= minSalaryValue;
    const matchesMaxSalary = jobSalary <= maxSalaryValue;
    const matchesStatus = status === "all" || calculateStatus(job.lastDateOfRegistration) === status;

    return matchesSearch && matchesType && matchesMinSalary && matchesMaxSalary && matchesStatus;
  });

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = (
      <>
        <div className="p-4 bg-gray-200">
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={handleSearchChange}
              className="p-2 border rounded mb-2 sm:mb-0 w-full sm:w-1/4"
            />
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded mb-2 sm:mb-0 w-full sm:w-1/4"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              {/* Add more options as needed */}
            </select>
            <div className="flex flex-col sm:flex-row sm:space-x-2 w-full sm:w-1/4">
              <input
                type="number"
                placeholder="Min Salary"
                value={minSalary}
                onChange={handleMinSalaryChange}
                className="p-2 border rounded mb-2 sm:mb-0 w-full"
              />
              <input
                type="number"
                placeholder="Max Salary"
                value={maxSalary}
                onChange={handleMaxSalaryChange}
                className="p-2 border rounded w-full"
              />
            </div>
            <select
              value={status}
              onChange={handleStatusChange}
              className="p-2 border rounded w-full sm:w-1/4"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredJobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </>
    );
  } else if (isError) {
    content = <p>{error.toString()}</p>;
  }

  return (
    <main>
      {content}
    </main>
  );
};

export default JobList;
