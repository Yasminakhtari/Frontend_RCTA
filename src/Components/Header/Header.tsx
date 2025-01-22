import React, { useState } from 'react';
import { IconAdCircle, IconBell, IconSettings, IconMenu2, IconX, IconShoppingCart,IconDots } from '@tabler/icons-react';
import { Avatar, Button, Indicator } from '@mantine/core';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import ProfileMenu from './ProfileMenu';
import { useSelector } from 'react-redux';
import { useCart } from '../productpage/CartContext';
import AdminSidebar from '../admin/AdminHome/AdminSidebar';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false); // Helper to close sidebar


  const navigate = useNavigate();
 
  const user = useSelector((state:any)=>state.user);//It allows functional React components to access and select data from the Redux store.
  // const cartItems = useSelector((state) => state.cart.items); // Fetch cart items.
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);  // Total item count 
  console.log("ooook");
  
  return (
    location.pathname !== "/signup" && location.pathname !== "/login" ? (
      <div className='w-full md:px-5  fixed top-0 z-50 px-4 lg:px-10 bg-blueRibbon-600 font-["poppins"] text-white h-20 flex justify-between items-center lg:h-20 '>
        {/* Logo Section */}
        {/* Left Section with Sidebar Toggle */}

        <div className='flex gap-3 items-center text-blueRibbon-950 f'>
          {/* <IconDots className='h-8 w-8 cursor-pointer mr-3' onClick={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
          <IconMenu2 className='h-8 w-8 cursor-pointer mr-3' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <IconAdCircle className='h-10 w-10 stroke-1.25' onClick={() => { navigate("/"); closeSidebar(); }} />
          <div className='text-2xl md:text-4xl  font-extrabold '>RC Tennis Academy</div>
        </div>

       
        <div className=' hidden lg:flex  md:text-xs lg:text-base'>
          <NavLinks/> 
        </div>

        {/* Actions */}
        <div className='flex md:gap-5 gap-2 justify-center items-center'>
          {/* <div className='hidden lg:flex gap-2 items-center' onClick={()=>navigate("/login")}>
            <div>username</div>
            <Avatar src="" alt="it's me" />
          </div> */}
          {/* <ProfileMenu/> */}
          {user ? <ProfileMenu onClose={closeSidebar} /> : <Link to="/login" onClick={closeSidebar}><button>Login</button></Link>}

          {/* {user ? <ProfileMenu/>:<Link to="/login"><button >Login</button></Link>} */}
           

          <div className='bg-mine-shaft-900 p-1.5 rounded-full hidden lg:block'>
            <Indicator color="blueRibbon.6" offset={5} size={12} withBorder processing>
              <IconBell stroke={1.5} onClick={closeSidebar} />
            </Indicator>
          </div>

          <div className='lg:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IconX className='h-8 w-8' /> : <IconMenu2 className='h-8 w-8' />}
          </div>
          {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer'>
            <Indicator color="blueRibbon.6" offset={5} size={12} withBorder >
              <IconShoppingCart stroke={1.5} onClick={() => navigate('/cart')} />
            </Indicator>
          </div> */}
          <div onClick={() => { navigate('/cart'); closeSidebar(); }} className='bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer'>
          
            <Indicator color="blueRibbon.6" offset={5} size={12} withBorder label={cartItemCount > 0 ? cartItemCount : undefined}>
              <IconShoppingCart stroke={1.5} />
            </Indicator>
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          // <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" onClick={closeSidebar}>

            <div onClick={(e) => e.stopPropagation()}>
            <AdminSidebar onClose={closeSidebar} />
            </div>
          </div>
        )}

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
                {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
                    <Indicator color="blueRibbon.6" offset={5} size={12} withBorder>
                      <IconShoppingCart stroke={1.5} onClick={() => navigate('/cart')} />
                    </Indicator>
                  </div> */}
                  <div className='bg-mine-shaft-900 p-1.5 rounded-full' onClick={() => navigate('/cart')}>
                    <Indicator color="blueRibbon.6" offset={5} size={12} withBorder label={cartItemCount > 0 ? cartItemCount : undefined}>
                      <IconShoppingCart stroke={1.5} />
                    </Indicator>
                  </div>

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
