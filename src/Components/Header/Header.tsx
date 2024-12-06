import React, { useState } from 'react';
import { IconAdCircle, IconBell, IconSettings, IconMenu2, IconX } from '@tabler/icons-react';
import { Avatar, Button, Indicator } from '@mantine/core';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import ProfileMenu from './ProfileMenu';
import { useSelector } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state:any)=>state.user);//It allows functional React components to access and select data from the Redux store. 
  console.log("ooook");
  
  return (
    location.pathname !== "/signup" && location.pathname !== "/login" ? (
      <div className='w-full md:px-16  fixed top-0 z-50 px-4 lg:px-20 bg-blueRibbon-600 font-["poppins"] text-white h-20 flex justify-between items-center lg:h-20 '>
        {/* Logo Section */}

        <div className='flex gap-3 items-center text-blueRibbon-950 f'>
          <IconAdCircle className='h-10 w-10 stroke-1.25' onClick={() => navigate("/")} />
          <div className='text-2xl md:text-4xl font-extrabold'>RC Tennis Academy</div>
        </div>

       
        <div className='hidden lg:flex'>
          <NavLinks/> 
        </div>

        {/* Actions */}
        <div className='flex gap-5 items-center'>
          {/* <div className='hidden lg:flex gap-2 items-center' onClick={()=>navigate("/login")}>
            <div>username</div>
            <Avatar src="" alt="it's me" />
          </div> */}
          {/* <ProfileMenu/> */}
          {user ? <ProfileMenu/>:<Link to="/login"><Button variant='filled' color="blueRibbon.9">Login</Button></Link>}
           

          <div className='bg-mine-shaft-900 p-1.5 rounded-full hidden lg:block'>
            <Indicator color="blueRibbon.6" offset={5} size={12} withBorder processing>
              <IconBell stroke={1.5} />
            </Indicator>
          </div>

          <div className='lg:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IconX className='h-8 w-8' /> : <IconMenu2 className='h-8 w-8' />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='absolute top-20 left-0 w-full bg-blueRibbon-500 text-white shadow-lg lg:hidden z-50'>
            <div className='flex flex-col items-center p-4'> 
              <NavLinks onClick={()=> setIsMenuOpen(false)}/> 
                {/* // Pass the setIsMenuOpen function to NavLinks so the menu closes when a link is clicked */}
            </div>
            <div className='border-t border-white/20 mt-2'>
              <div className='flex flex-col items-center gap-4 py-4'>
                {/* <div className='flex gap-2 items-center' onClick={()=>navigate("/login")}>
                  <div>username</div>
                  <Avatar src="" alt="it's me" />
                </div> */}
               
                {user ? <ProfileMenu/>:<Link to="/login"><Button variant='filled' color="blueRibbon.9">Login</Button></Link>}
                <div className='flex gap-3'>
                  <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                    <Indicator color="blueRibbon.6" offset={5} size={12} withBorder processing>
                      <IconBell stroke={1.5} />
                    </Indicator>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : <></>
  );
};

export default Header;
