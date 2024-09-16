import React, { useState, useEffect } from 'react';
import { useGetCompanyProfilesQuery, usePostJobMutation } from '../../api/apiSlice';
import { useParams } from 'react-router-dom';

const JobPostingForm = () => {
  const { companyId } = useParams();
  const { data: companyProfiles, isLoading: isCompanyLoading } = useGetCompanyProfilesQuery();
  const [postJob, { isSuccess, isError, error }] = usePostJobMutation();

  const companyProfile = companyProfiles?.find((profile) => profile.id === companyId);
  
  const [jobDetails, setJobDetails] = useState({
    title: '',
    location: '',
    salary: '',
    experience: '',
    description: '',
    companyName: '',
    logo: '',
    lastDateOfRegistration: ''  // New field for last date of registration
  });

  console.log(companyProfile)

  useEffect(() => {
    if (companyProfile) {
      setJobDetails(prevDetails => ({
        ...prevDetails,
        companyName: companyProfile.name,
        location: companyProfile.location,
        logo: companyProfile.logo
      }));
    }
  }, [companyProfile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await postJob(jobDetails).unwrap();
      alert('Job posted successfully!');
    } catch (err) {
      alert(`Failed to post job: ${err.message}`);
    }
  };

  if (isCompanyLoading) return <p>Loading company profile...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={jobDetails.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <select
          id="location"
          name="location"
          value={jobDetails.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select Location</option>
          <option value="Chennai">Chennai</option>
          {/* Add more locations if needed */}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={jobDetails.salary}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
        <input
          type="text"
          id="experience"
          name="experience"
          value={jobDetails.experience}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
        <textarea
          id="description"
          name="description"
          value={jobDetails.description}
          onChange={handleChange}
          required
          rows="4"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastDateOfRegistration" className="block text-sm font-medium text-gray-700">Last Date of Registration</label>
        <input
          type="datetime-local"
          id="lastDateOfRegistration"
          name="lastDateOfRegistration"
          value={jobDetails.lastDateOfRegistration}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Company Logo</label>
        {jobDetails.logo && (
          <img src={jobDetails.logo} alt="Company Logo" className="w-20 h-20 object-cover mb-2" />
        )}
        <p>{jobDetails.companyName}</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
      >
        Post Job
      </button>
      
      {isError && <p className="text-red-600 mt-2">{error.message}</p>}
    </form>
  );
};

export default JobPostingForm;
