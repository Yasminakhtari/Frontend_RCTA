import { useState, useEffect } from "react";
import { Avatar, Card, Timeline, Text, Divider, Title } from "@mantine/core";
import { IconTrophy, IconArrowUp } from "@tabler/icons-react";
import { journey, coaches } from "../Data/Data";
import './AboutUs.css';

const AboutUs = () => {
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-5 sm:px-10 lg:px-20 py-10 bg-blueRibbon-500 text-mine-shaft-100 font-['Poppins'] relative">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Title
          order={1}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyanAqua-400"
        >
          About Us
        </Title>
        <Text
          size="lg"
          className="mt-3 text-sm sm:text-base lg:text-lg text-mine-shaft-200 font-semibold"
        >
          Discover our journey, meet our dedicated coaches, and see how we’re
          shaping the future of tennis.
        </Text>
      </div>

      {/* Coach Section */}
      <div className="my-16">
        <Title
          order={2}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cyanAqua-400 text-center mb-6"
        >
          Meet Our Coaches
        </Title>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          {coaches.map((coach, index) => (
            <Card
              key={index}
              shadow="md"
              className="bg-blueRibbon-400 text-center p-4 sm:p-6 w-48 sm:w-56 lg:w-60 rounded-xl hover:bg-blueRibbon-700 transition-all"
            >
              <Avatar
                src={coach.avatar}
                size="xl"
                radius="50%"
                className="mb-4 mx-auto"
              />
              <Text size="lg" className="text-cyanAqua-400 font-bold">
                {coach.name}
              </Text>
              <Text size="sm" className="text-mine-shaft-200">
                {coach.title}
              </Text>
              <Divider my="sm" />
              <Text size="sm" className="text-mine-shaft-300">
                {coach.bio}
              </Text>
            </Card>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="my-16">
        <Title
          order={2}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cyanAqua-400 text-center mb-6"
        >
          Our Journey
        </Title>
        <div className="mx-auto max-w-full sm:max-w-xl lg:max-w-2xl">
          <Timeline active={journey.length - 1} bulletSize={32} lineWidth={2}>
            {journey.map((event, index) => (
              <Timeline.Item
                key={index}
                title={
                  <Text size="lg" className="text-cyanAqua-400 font-semibold">
                    {event.year}
                  </Text>
                }
                bullet={<IconTrophy size={20} />}
              >
                <Text size="sm" color="dimmed">
                  {event.description}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 bg-cyanAqua-400 text-mine-shaft-100 p-2 sm:p-3 rounded-full shadow-lg hover:bg-cyanAqua-300 transition duration-300"
        >
          <IconArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default AboutUs;
