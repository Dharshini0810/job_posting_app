import React, { useState } from "react";
import LoginCard from "../../components/LoginCard";
import { useAddUsersMutation } from "../../api/apiSlice";
import { useGetUsersQuery } from "../../api/apiSlice";
import Notification from "../../components/Notification";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

const UserSignUp = () => {
  const [addUser] = useAddUsersMutation();
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();

  const [username, setUsername] = useState("");
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
      const isEmailRegistered = users.some((user) => user.email === email);

      if (isEmailRegistered) {
        setNotification({ message: "Already Registered. Please Login.", type: "error" });
        setEmail('');
        setUsername('');
        return;
      }

      const userId = uuidv4();

      await addUser({ id: userId, email, password, username }).unwrap();
      setNotification({ message: "Registered Successfully", type: "success" });
      navigate('/login/user');
    } catch (err) {
      setNotification({ message: err?.message || "An unexpected error occurred. Try Again.", type: "error" });
    }

    setEmail('');
    setUsername('');
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
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default UserSignUp;
