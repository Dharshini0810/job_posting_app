import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [companyLoggedIn, setCompanyLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [state,setState] = useState(false);

  const { userId, companyId } = useParams();
  

  useEffect(() => {
    if (userId || state === true) {
      setState(true);
      setUserLoggedIn(true);
      setCompanyLoggedIn(false);
    } else if (companyId || state === true) {
      setState(true);
      setCompanyLoggedIn(true);
      setUserLoggedIn(false);
    } 
  }, [userId, companyId,state]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
    setUserLoggedIn(false);
    setCompanyLoggedIn(false);
    setState(false);

  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className='w-full bg-white shadow-md py-4 fixed top-0 left-0 z-50 animation-fadeIn'>
      <div className='container mx-auto flex justify-between items-center px-6'>
        {/* Left Side: Title */}
        <div className='text-2xl font-bold text-gray-800'>
          Job Posting Platform
        </div>

        {/* Right Side: Navigation Items */}
        <nav className='flex items-center'>
          <ul className='flex space-x-6 items-center'>
            <li>
              <Link
                to='/'
                className='text-gray-600 hover:text-blue-500 font-semibold transition duration-300'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='text-gray-600 hover:text-blue-500 font-semibold transition duration-300'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to='/jobs'
                className='text-gray-600 hover:text-blue-500 font-semibold transition duration-300'
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='text-gray-600 hover:text-blue-500 font-semibold transition duration-300'
              >
                Contact
              </Link>
            </li>
            {userLoggedIn || companyLoggedIn ? (
              <li className='relative'>
                <button
                  className='bg-slate-400 text-black font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center'
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faUserAlt}/>
                </button>
                {dropdownOpen && (
                  <div className='absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg'>
                    <ul className='py-2'>
                      <li>
                        <Link
                          to={`/user-profile/${userId}`}
                          className='block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300'
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/applied-jobs'
                          className='block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300'
                          onClick={() => setDropdownOpen(false)}
                        >
                          Applied Jobs
                        </Link>
                      </li>
                      <li>
                        <button
                          className='block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 text-left transition duration-300'
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300'
                  onClick={handleLogin}
                >
                  Login / SignUp
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
