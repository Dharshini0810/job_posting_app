import React, { useState } from 'react';
import LoginCard from '../../components/LoginCard';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCompaniesQuery } from '../../api/apiSlice'; 
import Notification from '../../components/Notification'; 

const CompanyLogin = () => {
  const { data: companies } = useGetCompaniesQuery(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email and password match any company
      const company = companies.find(
        (company) => company.email === email && company.password === password
      );

      if (company) {
        setSuccess('Login Successful');
        setError(null);
        // Navigate to the company profile or dashboard
        navigate(`/company-profile/${company.id}`); // Replace with your route
      } else {
        setSuccess(null);
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <>
      <LoginCard title="Company Sign In">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

      
          <div className="flex items-center justify-between mt-4">
            <Link to="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
            <Link to="/signup/company" className="text-sm text-blue-600 hover:underline">Create an Account</Link>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </LoginCard>

      {/* Notifications */}
      {error && <Notification message={error} type="error" onClose={() => setError(null)} />}
      {success && <Notification message={success} type="success" onClose={() => setSuccess(null)} />}
    </>
  );
};

export default CompanyLogin;
