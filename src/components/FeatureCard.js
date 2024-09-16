import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureCard = ({title, description, icon}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 animate-fadeIn h-80 justify-evenly'>
      <FontAwesomeIcon icon={icon} className='text-4xl text-red-600 mb-4' />
      <h3 className='text-xl font-semibold text-gray-800 mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

export default FeatureCard
