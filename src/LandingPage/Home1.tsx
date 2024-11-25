import { useState, useEffect } from "react";
import { Avatar, TextInput } from "@mantine/core";
import { IconSearch, IconArrowUp } from "@tabler/icons-react";

const Home1 = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col md:flex-row px-5 md:px-20 items-center md:items-start">
      {/* Left Section */}
      <div className="flex flex-col w-full md:w-[45%] px-2 md:px-16">
        <div className="text-3xl md:text-6xl font-bold text-mine-shaft-100 leading-tight [&>span]:text-blueRibbon-900">
          Join the <span>Ultimate Tennis</span> Experience
        </div>
        <div className="text-sm md:text-lg text-mine-shaft-200 mt-3">
          Discover a community of players, exciting tournaments, and exclusive training programs at our tennis club.
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          <TextInput
            className="flex-1 bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            placeholder="Search tournaments or training"
            label="Explore"
            variant="unstyled"
          />
          <TextInput
            className="flex-1 bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            placeholder="Location (e.g., Texas)"
            label="Location"
            variant="unstyled"
          />
          <div className="flex items-center justify-center h-12 w-12 bg-blueRibbon-600 text-mine-shaft-100 rounded-lg p-2 hover:bg-blueRibbon-500 cursor-pointer">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[55%] flex items-center justify-center mt-10 md:mt-0">
        <div className="w-full max-w-md relative">
          <img src="/tennis.png" alt="Tennis club" className="w-full h-auto" />
          <div className="absolute -right-5 md:-right-10 top-[50%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-xs md:text-sm text-mine-shaft-100">
              2K+ Active Members
            </div>
            <Avatar.Group spacing="sm">
              <Avatar src="player1.jpg" radius="xl" />
              <Avatar src="player2.jpg" radius="xl" />
              <Avatar src="player3.jpg" radius="xl" />
              <Avatar radius="xl">+2K</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute -left-5 md:-left-10 top-[28%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md mb-3 flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 p-1 bg-blueRibbon-900 rounded-lg">
                <img src="/tenis logo.png" alt="tennis logo" />
              </div>
              <div className="text-xs md:text-sm text-mine-shaft-100">
                <div>Upcoming Tournament</div>
                <div className="text-mine-shaft-200 text-[10px] md:text-xs">
                  Texas, USA
                </div>
              </div>
            </div>

            <div className="flex gap-2 text-mine-shaft-200 text-xs md:text-sm justify-between">
              <span>Aug 15, 2024</span>
              <span>Open to All Levels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blueRibbon-600 text-mine-shaft-100 p-3 rounded-full shadow-lg hover:bg-blueRibbon-500"
        >
          <IconArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home1;
