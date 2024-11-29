import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconArrowUp } from '@tabler/icons-react'; 

const ScrollUp = () => {
  const location = useLocation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (location.pathname === '/signup' || location.pathname === '/login') {
    return null;
  }

  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 bg-cyanAqua-400 text-mine-shaft-100 p-2 sm:p-3 rounded-full shadow-lg hover:bg-cyanAqua-300 transition duration-300"
        >
          <IconArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollUp;
