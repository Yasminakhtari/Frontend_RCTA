import React from 'react';
import { Avatar, Button, Rating } from "@mantine/core";
import { testimonials } from "../../Data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        What <span className="text-blueRibbon-950">User</span> Says about us?
      </div>

      {/* Card Section for larger screens */}
      <div className="hidden md:flex gap-3 justify-evenly">
        {testimonials.map((items, index) => (
          <div key={index} className="flex flex-col gap-3 w-[23%] border-blueRibbon-900 p-3 border rounded-xl mt-10">
            <div className="flex flex-col lg:flex-row gap-2 items-center">
              <div>
                <Avatar className="!h-14 !w-14" src="iranian-8594205_1280.jpg" alt={items.name} />
                <div>
                  <div className="text-lg text-mine-shaft-100 font-semibold">{items.name}</div>
                  <Rating value={items.rating} fractions={2} color="blueRibbon.10" readOnly />
                </div>
              </div>
              <div className="md:text-xs text-mine-shaft-200 text-xl">
                {items.testimonial}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      <div className="text-center mt-6">
        <Link to="/testimonial">
          <Button className='flex mt-3 items-center justify-center cursor-pointer !text-gray-200 !bg-gray-900 px-6 py-2'>
            View All Reviews ⭐
          </Button>       
        </Link>
      </div>

      {/* Carousel for Small Screens */}
      <div className="md:hidden">
        <Slider {...settings}>
          {testimonials.map((items, index) => (
            <div key={index} className="p-4 grid grid-cols-1">
              <div className="flex flex-col gap-3 border-blueRibbon-900 p-3 border rounded-xl">
                <div className="flex gap-2 items-center">
                  <Avatar className="!h-14 !w-14" src="iranian-8594205_1280.jpg" alt={items.name} />
                  <div>
                    <div className="text-lg text-mine-shaft-100 font-semibold">{items.name}</div>
                    <Rating value={items.rating} fractions={2} color="blueRibbon.10" readOnly />
                  </div>
                </div>
                <div className="text-xs text-mine-shaft-300 mt-2 min-h-10">
                  {items.testimonial}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
