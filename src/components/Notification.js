import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hide notification after 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
      style={{ zIndex: 1000 }}
    >
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
