import React from 'react'
import HeroSection from './HeroSection/HeroSection'
import About from './About/About'
import JobSection from './JobSection/JobSection'


const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-10 bg-gray-100'>
        <HeroSection/> 
        <About/> 
        <JobSection/>
    </div>
  )
}

export default Home
