import { Avatar } from "@mantine/core";
// import { tennisSteps } from "../../Data/Data"; 
import { useEffect, useState } from "react";
import axios from "axios";
import { IconUserPlus, IconTarget, IconTrophy, IconChartLine, IconAward } from "@tabler/icons-react";

type tennisStepItem = {
  id: number;
  groups: string;
  category: string;
  subcategory: "one" | "two" | "three" | "four" | "five"; // Restrict to valid subcategories
  imgUrl: string;
  name: string;
  description: string;
  duration: number | null;
  price: number | null;
  status: string;
  discount: number;
  disbegindate: string | null;
  disenddate: string | null;
  disquantity: number | null;
  phoneNumber: string | null;
};


const staticIcons = [
  IconUserPlus,
  IconTarget,
  IconTrophy,
  IconChartLine,
  IconAward,
];

export const base_url = "https://backend-rcta.onrender.com/api/v1";
// export const base_url = "http://localhost:8082/api/v1";


const LandingMediumSection = () => {


  const [tennisStep,setTennisStep] = useState<tennisStepItem []>([]);

   //////////////////////
   useEffect(()=>{
    const fetchdata = async()=>{
      try{
        const response =await axios.get(`${base_url}/getFilteredTennis`,{
          params: {
            group: "Tennis Steps"
          },
          headers:{
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            
          }
        });
         // Clean up descriptions to remove HTML tags
        const cleanedData = response.data.map((item: tennisStepItem) => ({
          ...item,
          description: item.description.replace(/<[^>]*>/g, "").trim(), // Strip HTML tags
        }));

        console.log(cleanedData);
        setTennisStep(cleanedData);

      }catch(error){
        console.log(error);
      }
    }

    fetchdata()
  },[])
  ///////////////////////////
  return (
    <div className="mt-20 pb-5">
      {/* Title Section */}
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        How to <span className="text-blueRibbon-950">Get Started</span> at Our Academy
      </div>
      <div className="text-lg mx-auto mb-10 text-mine-shaft-200 text-center w-3/4">
        Follow these simple steps to join our academy, enhance your skills, and reach your tennis potential.
      </div>
git 
      {/* Steps Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        {/* Left Section */}
        <div className="relative md:w-[28rem] w-full mb-8 md:mb-0">
          <img className="w-full h-auto" src="/lawntenis.png" alt="Tennis Player" />
          <div className="w-40 flex flex-col items-center gap-1 border border-blueRibbon-900 rounded-xl py-3 px-1 backdrop-blur-md absolute top-[60%] md:top-[18%] right-0">
            <Avatar className="h-6 w-6 md:h-16 md:w-16" src="player-avatar.jpg" alt="Player Avatar" />
            <div className="md:text-sm  text-xs font-semibold text-mine-shaft-100 text-center">Create Your Profile</div>
            <div className="text-xs text-mine-shaft-200">75% Completed</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          {tennisStep.map((step, index) => {
            const Icon = staticIcons[index % staticIcons.length]; // Cycle through static icons
            return (
              <div key={step.id} className="flex items-start gap-4 mb-6">
                {/* Icon Section */}
                <div className="p-3 bg-blueRibbon-300 rounded-full flex items-center justify-center">
                  <Icon className="text-white h-6 w-6" />
                </div>

                {/* Text Section */}
                <div>
                  <div className="text-mine-shaft-100 text-xl font-semibold">{step.name}</div>
                  <div className="text-mine-shaft-200 text-base">{step.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingMediumSection;
