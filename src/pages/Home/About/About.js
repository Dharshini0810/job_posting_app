import React, { useState } from 'react';
import FeatureCard from '../../../components/FeatureCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faMagnifyingGlass, faCircleExclamation, faChartColumn, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const cards = [
  {
    title: 'Job Search and Filters',
    description: 'Advanced search functionality with filters for location, job type, industry, salary range, and more.',
    icon: faMagnifyingGlass,
  },
  {
    title: 'Job Alerts',
    description: 'Notifications for new job postings based on user preferences and search history.',
    icon: faCircleExclamation,
  },
  {
    title: 'Applicant Tracking System',
    description: 'Tools to manage applications, screen candidates, and streamline the hiring process.',
    icon: faChartColumn,
  },
  {
    title: 'Company Profile',
    description: 'Features to create and maintain a company profile to attract candidates.',
    icon: faAddressCard,
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <section className='w-full py-12 bg-gray-100 relative'>
      <div className='container mx-auto px-6'>
        <div className='relative overflow-hidden animation-fadeIn'>
          <div
            className='flex transition-transform duration-300 ease-in-out'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div key={index} className='flex-shrink-0 w-full sm:w-1/3 lg:w-1/4 p-4'>
                <FeatureCard 
                  title={card.title} 
                  description={card.description} 
                  icon={card.icon} 
                />
              </div>
            ))}
          </div>
          {currentIndex > 0 && (
            <button 
              className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 text-gray-800 p-3 rounded-full focus:outline-none'
              onClick={handlePrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          {currentIndex + 3 < cards.length - 1 && (
            <button 
              className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 text-gray-800 p-3 rounded-full focus:outline-none'
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
