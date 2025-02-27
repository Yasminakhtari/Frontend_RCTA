import React, { useEffect, useState } from 'react';
// import { testimonials } from '../../Data/Data'; 
import { Button, Rating } from '@mantine/core';
import image from './tp13.png';
import { useNavigate } from 'react-router-dom';
import { IconPhone } from '@tabler/icons-react';
import { getAllFeedback } from '../../Services/FeedbackService';


  interface Feedback {
    createdOn: string; 
    createdBy: string; 
    updatedOn: string | null;
    updatedBy: string | null; 
    id: number; 
    name: string; 
    message: string; 
    rating: number; 
    bitDeletedFlag: number; 
}


const AllTesti = () => {
  const navigate = useNavigate();
  const [testimonials,setTestimonials] = useState<Feedback[]>([]);


  useEffect(()=>{
      const fetchData = async () => {
        try{
          const response = await getAllFeedback();
          console.log(response.data);
          setTestimonials(response.data);
        }catch(error){
          console.log(error);
        }
      }

      fetchData();
  },[])

 // Split testimonials into three columns
 const column1 = testimonials.filter((_, i) => i % 3 === 0);
 const column2 = testimonials.filter((_, i) => i % 3 === 1);
 const column3 = testimonials.filter((_, i) => i % 3 === 2);


  return (
    <>
      <div className="relative">
        {/* Section Title */}
        <h2 className="text-center text-3xl font-extrabold my-8 uppercase relative mt-32 text-gray-900">
          What our Players Say
          <span className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 block w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></span>
        </h2>

        {/* Container for Testimonials */}
        <div
          className="flex gap-8 max-w-[1200px] h-[500px] w-full mx-auto p-6 overflow-hidden mask-gradient-to-bottom 
          bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-xl lg:flex-row md:flex-row sm:flex-col"
        >
          {/* COLUMN 1 */}
          
          <div className="w-full lg:w-1/3 h-full overflow-hidden relative lg:block md:hidden sm:block">
            <div className="flex flex-col gap-6 animate-scrollUp lg:animation-duration-10 sm:animation-duration-5">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-lg p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img src={image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Player</div>
                    </div>
                  </div>
                  <p className="text-gray-800">{item.message}</p>
                  <Rating value={item.rating} fractions={2} color="blueRibbon.10" readOnly />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="w-full lg:w-1/3 h-full overflow-hidden relative lg:block md:block sm:hidden">
            <div className="flex flex-col gap-6 animate-scrollDown">
              {testimonials.slice(0, testimonials.length).map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-lg p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img src={image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Player</div>
                    </div>
                  </div>
                  <p className="text-gray-800">{item.message}</p>
                  <Rating value={item.rating} fractions={2} color="blueRibbon.10" readOnly />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="w-full lg:w-1/3 h-full overflow-hidden relative lg:block md:block sm:hidden">
            <div className="flex flex-col gap-6 animate-scrollUp">
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-lg p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img src={image} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Player</div>
                    </div>
                  </div>
                  <p className="text-gray-800">{item.message}</p>
                  <Rating value={item.rating} fractions={2} color="blueRibbon.10" readOnly />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <Button
          leftSection={<IconPhone size={20} />}
          className="fixed bottom-4 right-4 z-10 
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
          onClick={() => navigate('/contact-us')}
        >
          Contact Us
        </Button>
      </div>
    </>
  );
};

export default AllTesti;
