import React from 'react'
import {IconAdCircle, IconBell, IconSettings} from "@tabler/icons-react";
// IconAsset
import { Avatar, Indicator } from '@mantine/core';
import NavLinks from './NavLinks';

const Header = () => {
  return (
    <>
      <div className='w-full bg-blueRibbon-600 font-["poppins"] text-white h-20 flex justify-between px-6 items-center'>
        
          <div className='flex gap-3 items-center text-blueRibbon-950'>
            <IconAdCircle className='h-10 w-10 stroke={1.25}'/>
            <div className='text-3xl font-semibold'>RC Tennis Academy</div>
          </div>

          {/* <div>
            <NavLinks/>
          </div> */}
          <div>
            {NavLinks()}
          </div>

          <div className='flex gap-5 items-center'>
             
            <div className='flex gap-2 items-center'>
              <div>username</div>
              <Avatar src="" alt="it's me" />
            </div>
           
           <div className='bg-mine-shaft-900 p-1.5 rounded-full'> 
               <IconSettings stroke={1.5}/>
           </div>

           <div className='bg-mine-shaft-900 p-1.5 rounded-full'> 
              <Indicator  color="blueRibbon.6"  offset={5} size={12} withBorder processing>
                    <IconBell stroke={1.5}/>
              </Indicator>
           </div>
            
          </div>
      </div>
    </> 
  )
}
 
export default Header