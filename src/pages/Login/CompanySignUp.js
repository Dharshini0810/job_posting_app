import React, { useState } from 'react';
import LoginCard from '../../components/LoginCard';
import {useNavigate } from 'react-router-dom'; 
import { useAddCompaniesMutation,useGetCompaniesQuery } from '../../api/apiSlice';
import Notification from '../../components/Notification'; 
import {v4 as uuidv4} from 'uuid';

const CompanySignUp = () => {
  const { data: companies } = useGetCompaniesQuery(); 
  const [addCompanies] = useAddCompaniesMutation();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      const isEmailRegistered = companies.some((company) => company.email === email || company.companyName === companyName);

      if (isEmailRegistered) {
        setNotification({ message: "Already Registered. Please Login.", type: "error" });
        setEmail('');
        setCompanyName('');
        return;
      }

      const companyId = uuidv4();

      await addCompanies({ id: companyId, email, password, companyName }).unwrap();
      setNotification({ message: "Registered Successfully", type: "success" });
      navigate('/login/company');
    } catch (err) {
      setNotification({ message: err?.message || "An unexpected error occurred. Try Again.", type: "error" });
    }

    setEmail('');
    setCompanyName('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <LoginCard title="User Sign Up">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email<span className="text-red-500">*</span>
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
            Password<span className="text-red-500">*</span>
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

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleNotificationClose}
        />
      )}
    </LoginCard>
  );
};

export default CompanySignUp;
