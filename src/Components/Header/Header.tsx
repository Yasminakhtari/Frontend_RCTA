import React, { useState, useEffect, useRef } from 'react';
import { IconAdCircle, IconBell, IconMenu2, IconX, IconShoppingCart } from '@tabler/icons-react';
import { Avatar, Button, Indicator, Text } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCart } from '../productpage/CartContext';
import NavLinks from './NavLinks';
import ProfileMenu from './ProfileMenu';
import { getNotificationsForUser, markNotificationAsRead } from '../../Services/NotificationService1';
import { NotificationType } from '../../Services/types';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [notification, setNotification] = useState<any>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { cart } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const user = useSelector((state: any) => state.user);
  const userId = user?.data?.userDetails?.id;

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) fetchNotification();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mobile menu if clicked outside
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }

      // Close notification dropdown if clicked outside
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotification(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const fetchNotification = async () => {
  //   try {
  //     const response = await getNotificationsForUser(userId);
  //     console.log(response);
  //     setNotification(response ?? null); 
  //   } catch (error) {
  //     console.error('Error fetching notification:', error);
  //     setNotification(null);
  //   }
  // };
  const fetchNotification = async () => {
    try {
      const data = await getNotificationsForUser(userId);
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  // const handleNotificationClick = async () => {
  //   if (userId && notification) {
  //     await markNotificationAsRead(notification.notificationId, userId);
  //     navigate('/feedback');
  //     setShowNotification(false);
  //     setNotification(null);
  //   }
  // };

  
  // Calculate total unread count
  const unreadCount = notifications.reduce((count, notification) => {
    return count + notification.users.filter(u => u.status === 'unread').length;
  }, 0);


  if (location.pathname === '/signup' || location.pathname === '/login') {
    return null;
  }

  // ⭐ Calculate unread count
  // const unreadCount = notifications.users?.filter((u: any) => u.status === 'unread').length || 0;

  return (
    <div className='w-full fixed top-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 bg-blueRibbon-600 font-["poppins"] text-white h-20 flex justify-between items-center'>
      {/* Logo Section */}
      <div className='flex gap-3 items-center text-blueRibbon-950'>
        <IconAdCircle className='h-8 w-8 sm:h-10 sm:w-10 stroke-1.25 cursor-pointer' onClick={() => navigate('/')} />
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold'>RC Tennis Academy</div>
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex md:text-xs lg:text-base'>
        <NavLinks />
      </div>

      {/* Actions */}
      <div className='flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-center'>
        {user ? <ProfileMenu /> : (
          <Link to='/login'>
            <Button className='text-xs sm:text-sm'>Login</Button>
          </Link>
        )}

        {/* Notification Bell - Visible on all screens */}
        <div className='bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer relative' ref={notificationRef}>
          <Indicator
            color="red"
            size={16}
            disabled={unreadCount === 0}
            label={unreadCount > 0 ? unreadCount : undefined}
          >
            <IconBell
              stroke={1.5}
              className="h-5 w-5 sm:h-6 sm:w-6 hover:text-blue-300 transition-colors"
              onClick={() => setShowNotification(!showNotification)}
            />
          </Indicator>

          {/* Notification Dropdown */}
          {/* {showNotification && notification && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-blue-100 z-50">
              <div className="p-4 border-b border-blue-100 bg-blue-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📢</span>
                  <h3 className="font-semibold text-blue-800 text-lg">
                    {notification.message}
                  </h3>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {notification.status === 'SENT' ? '✅ Sent' : '🕒 Pending'}
                  </span>
                  <span className="text-sm text-blue-500">
                    {unreadCount} unread
                  </span>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto p-3">
                {notification.users.map((userr: any) => (
                  <div
                    key={userr.id}
                    className={`p-3 hover:bg-blue-50/30 cursor-pointer transition-all
                    rounded-lg mb-1 ${userr.status === 'unread' ? 'bg-blue-50/80 border border-blue-100' : ''}`}
                    onClick={handleNotificationClick}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className='flex gap-1 items-center'>
                          <Avatar
                            src={user?.data?.userDetails?.profile || "iranian-8594205_1280.jpg"}
                            size="sm"
                            alt="profile"
                          />
                        </div>
                        <div>
                          {userr.status === 'unread' ? (
                            <Text size="sm" className="font-medium !text-blue-900">
                              {`${user?.data?.userDetails?.firstName}, we need your feedback`}
                            </Text>
                          ) : (
                            <Text size="sm" className="font-medium !text-orange-600">
                              {`${user?.data?.userDetails?.firstName}, thank you!`}
                            </Text>
                          )}
                          <Text size="xs" className="!text-blue-500 mt-1">
                            {userr.status === 'unread' ? 'New feedback request' : 'Feedback received'}
                          </Text>
                        </div>
                      </div>
                      {userr.status === 'unread' ? (
                        <span className="text-blue-500 animate-pulse">🔵</span>
                      ) : (
                        <span className="text-green-500">✅</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-blue-100 bg-blue-50/30 rounded-b-xl">
                <Text size="xs" className="text-center text-blue-500">
                  Click to {unreadCount > 0 ? 'provide feedback' : 'view details'}
                </Text>
              </div>
            </div>
          )} */}
          {showNotification && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Notifications ({notifications.length})</h3>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {notifications.map(notification => (
                  <div
                    key={notification.notificationId}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${notification.users.some(u => u.status === 'unread')
                        ? 'bg-blue-50' : ''
                      }`}
                    onClick={async () => {
                      await markNotificationAsRead(notification.notificationId, userId);
                      fetchNotification();
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(notification.createdOn).toLocaleDateString()}
                        </p>
                      </div>
                      {notification.users.some(u => u.status === 'unread') && (
                        <span className="text-blue-500 text-sm">New</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t text-center">
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => navigate('/notifications')}
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IconX className='h-7 w-7' /> : <IconMenu2 className='h-7 w-7' />}
        </div>

        {/* Cart Icon */}
        <div className='bg-mine-shaft-900 p-1.5 rounded-full cursor-pointer' onClick={() => navigate('/cart')}>
          <Indicator
            color='blueRibbon.6'
            offset={5}
            size={12}
            withBorder
            label={cartItemCount > 0 ? cartItemCount : undefined}
          >
            <IconShoppingCart stroke={1.5} className="h-5 w-5 sm:h-6 sm:w-6" />
          </Indicator>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={mobileMenuRef} className='absolute top-20 left-0 w-full bg-blueRibbon-500 text-white shadow-lg md:hidden z-50'>
          <div className='flex flex-col items-center p-4'>
            <NavLinks onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;