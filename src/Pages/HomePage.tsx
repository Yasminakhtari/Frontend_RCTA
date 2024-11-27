import React, { useState, useEffect } from "react";
import Clubs from "../Components/LandingPage/Clubs";
import Home1 from "../Components/LandingPage/Home1";
import LandingMediumSection from "../Components/LandingPage/LandingMediumSection";
import Subscribe from "../Components/LandingPage/Subscribe";
import Testimonials from "../Components/LandingPage/Testimonials";

const HomePage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFading, setIsFading] = useState(false);

  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Apply fade effect when user has scrolled more than 80% of the page
    if (scrollPercentage > 0) {
      setIsFading(true);  // Show fade when scrolling near bottom
    } else {
      setIsFading(false); // Hide fade when scrolling back up
    }

    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" px-2 md:px-16 lg:px-20 min-h-screen w-full bg-blueRibbon-600 font-['poppins'] relative">
      {/* Sections */}
      <Home1 />
      <Clubs />
      <LandingMediumSection />
      <Testimonials />
      <Subscribe />

      
      {isFading && (
        <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blueRibbon-600 to-transparent pointer-events-none z-10"></div>
      )}
    </div>
  );
};

export default HomePage;
