import { Avatar } from '@mantine/core'
import React from 'react'

interface TestiCardProps {
  name: string;
  role: string;
  content: string;
}

const TestiCard: React.FC<TestiCardProps> = ({ name, role, content }) => {
  return (
    // Main container for the card
    <div className='bg-slate-100 p-6 rounded-sm border border-blueRibbon-900 gap-3 flex flex-col shadow-2xl w-full sm:w-[45%] md:w-[30%] lg:w-[23%]'>
      {/* Profile section: Avatar, name, and role */}
      <div className='flex items-center gap-4 mb-4'>
        <div className='rounded-lg object-cover'>
          <Avatar 
            className="!h-14 !w-14" 
            src="iranian-8594205_1280.jpg" 
            alt="Profile Picture" 
          />
        </div>
        <div>
          <div className='font-semibold text-lg'>{name}</div> 
          <div className='text-sm text-gray-600'>{role}</div> {/* Display role correctly */}
        </div>
      </div>
      
      {/* User testimonial content */}
      <div className='leading-6 text-blue-950 text-sm md:text-base'>
        {content}
      </div>
    </div>
  )
}

export default TestiCard
