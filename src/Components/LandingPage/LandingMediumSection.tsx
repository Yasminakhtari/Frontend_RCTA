import { Avatar } from "@mantine/core";
import { tennisSteps } from "../../Data/Data"; 

const LandingMediumSection = () => {
  return (
    <div className="mt-20 pb-5">
      {/* Title Section */}
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        How to <span className="text-blueRibbon-950">Get Started</span> at Our Academy
      </div>
      <div className="text-lg mx-auto mb-10 text-mine-shaft-300 text-center w-3/4">
        Follow these simple steps to join our academy, enhance your skills, and reach your tennis potential.
      </div>

      {/* Steps Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        {/* Left Section */}
        <div className="relative md:w-[28rem] w-full mb-8 md:mb-0">
          <img className="w-full h-auto" src="/lawntenis.png" alt="Tennis Player" />
          <div className="w-40 flex flex-col items-center gap-1 border border-blueRibbon-900 rounded-xl py-3 px-1 backdrop-blur-md absolute top-[60%] md:top-[18%] right-0">
            <Avatar className="h-6 w-6 md:h-16 md:w-16" src="player-avatar.jpg" alt="Player Avatar" />
            <div className="md:text-sm  text-xs font-semibold text-mine-shaft-200 text-center">Create Your Profile</div>
            <div className="text-xs text-mine-shaft-300">75% Completed</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          {tennisSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-2.5 bg-blueRibbon-300 rounded-full">
                <step.icon className="h-12 w-12 text-mine-shaft-100" />
              </div>
              <div>
                {/* Step Name */}
                <div className="text-mine-shaft-200 text-xl sm:text-2xl md:text-xl font-semibold">
                  {step.name}
                </div>
                {/* Step Description */}
                <div className="text-mine-shaft-300 text-base sm:text-lg md:text-base">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingMediumSection;
