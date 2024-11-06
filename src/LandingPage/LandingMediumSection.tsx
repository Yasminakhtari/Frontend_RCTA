import { Avatar } from "@mantine/core";
import { tennisSteps } from "../Data/Data"; 

const LandingMediumSection = () => {
  return (
    <div className="mt-20 pb-5">
      {/* Title Section */}
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-3">
        How to <span className="text-cyanAqua-400">Get Started</span> at Our Academy
      </div>
      <div className="text-lg mx-auto mb-10 text-mine-shaft-300 text-center w-3/4">
        Follow these simple steps to join our academy, enhance your skills, and reach your tennis potential.
      </div>

      {/* Steps Section */}
      <div className="flex px-16 justify-between items-center">
        {/* Left Section */}
        <div className="relative">
          <img className="w-[28rem]" src="/lawntenis.png" alt="Tennis Player" />
          <div className="w-40 flex flex-col items-center gap-1 border border-cyanAqua-400 rounded-xl py-3 px-1 backdrop-blur-md absolute top-[18%] right-0">
            <Avatar className="!h-16 !w-16" src="player-avatar.jpg" alt="Player Avatar" />
            <div className="text-sm font-semibold text-mine-shaft-200 text-center">Create Your Profile</div>
            <div className="text-xs text-mine-shaft-300">75% Completed</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-10 w-1/2">
          {tennisSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2.5 bg-cyanAqua-300 rounded-full">
                <step.icon className="h-12 w-12 text-mine-shaft-100" />
              </div>
              <div>
                <div className="text-mine-shaft-200 text-xl font-semibold">{step.name}</div>
                <div className="text-mine-shaft-300">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingMediumSection;
