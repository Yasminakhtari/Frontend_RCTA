import Marquee from "react-fast-marquee";
import { clubs } from "../Data/Data";

const Clubs = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-10">
        In Partnership with <span className="text-blueRibbon-950">100+</span> Tennis Clubs
      </div>
      <Marquee pauseOnHover>
        {clubs.map((club: string, index: number) => (
          <div key={index} className="mx-8 px-2 py-1 hover:bg-blueRibbon-900 rounded-xl cursor-pointer ">
            <img
              className="h-14"
              src={`/Clubs/${club}.png`}
              alt={`${club} logo`}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Clubs;
