import React from 'react';
import { IconAdCircle, IconBell, IconSettings } from "@tabler/icons-react";
import { Avatar, Indicator } from '@mantine/core';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <>
      <div className='w-full bg-blueRibbon-600 font-["poppins"] text-white h-20 flex justify-between px-4 md:px-6 items-center'>
        
        {/* Logo Section */}
        <div className='flex gap-2 md:gap-3 items-center text-blueRibbon-950'>
          <IconAdCircle className='h-8 w-8 md:h-10 md:w-10 stroke-[1.25]'/>
          <div className='text-xl md:text-3xl font-semibold'>RC Tennis Academy</div>
        </div>

        {/* Navigation Links */}
        <div className='hidden md:block'>
          {NavLinks()}
        </div>

        {/* Right Section */}
        <div className='flex gap-3 md:gap-5 items-center'>
          
          {/* Username and Avatar */}
          <div className='hidden sm:flex gap-2 items-center'>
            <div className='text-sm md:text-base'>username</div>
            <Avatar src="" alt="it's me" size={30} />
          </div>

          {/* Settings Icon */}
          <div className='bg-mine-shaft-900 p-1 rounded-full sm:p-1.5'>
            <IconSettings stroke={1.5} />
          </div>

          {/* Notification Bell with Indicator */}
          <div className='bg-mine-shaft-900 p-1 rounded-full sm:p-1.5'>
            <Indicator color="blueRibbon.6" offset={5} size={12} withBorder processing>
              <IconBell stroke={1.5} />
            </Indicator>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
