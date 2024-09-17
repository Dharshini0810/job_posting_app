import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobsQuery, useApplyForJobMutation } from '../../api/apiSlice';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const { data: jobDetails, isLoading, isError, error } = useGetJobsQuery(jobId);
  const [applyForJob, { isSuccess: isApplySuccess, isError: isApplyError, error: applyError }] = useApplyForJobMutation();
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (isApplySuccess) {
      alert('Applied successfully!');
    }
    if (isApplyError) {
      alert(`Failed to apply: ${applyError.message}`);
    }
  }, [isApplySuccess, isApplyError, applyError]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await applyForJob({ jobId }).unwrap();
      setIsApplying(false);
    } catch (err) {
      setIsApplying(false);
      alert(`Failed to apply: ${err.message}`);
    }
  };

  if (isLoading) return <p>Loading job details...</p>;
  if (isError) return <p>Error loading job details: {error.message}</p>;

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg mt-20">
      <h1 className="text-3xl font-bold mb-4">{jobDetails.title}</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Company Details</h2>
        <p><strong>Company Name:</strong> {jobDetails.companyName}</p>
        <p><strong>Location:</strong> {jobDetails.location}</p>
        {jobDetails.logo && (
          <img src={jobDetails.logo} alt="Company Logo" className="w-32 h-32 object-cover mt-2" />
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Job Description</h2>
        <p>{jobDetails.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Salary</h2>
        <p>{jobDetails.salary}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Experience Required</h2>
        <p>{jobDetails.experience}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Educational Qualifications</h2>
        <p>{jobDetails.educationalQualifications}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Skills Required</h2>
        <p>{jobDetails.skillsRequired}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Hiring Rounds/Stages</h2>
        <p>{jobDetails.rounds}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Last Date of Registration</h2>
        <p>{new Date(jobDetails.lastDateOfRegistration).toLocaleString()}</p>
      </div>

      <button
        onClick={handleApply}
        disabled={isApplying}
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
      >
        {isApplying ? 'Applying...' : 'Apply'}
      </button>

      {isApplyError && <p className="text-red-600 mt-2">{applyError.message}</p>}
    </div>
  );
};

export default JobDetailPage;
