import { Avatar, Card, Timeline, Text, Divider, Title } from "@mantine/core";
import { journey,coaches } from "../../Data/Data";
import { IconTrophy } from "@tabler/icons-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const AboutUs = () => {

  useEffect(() => {
    AOS.init({
      duration: 7000, 
      once: true, // animation happens only once when scrolling down
    });
    AOS.refresh(); // To refresh the AOS library and detect new elements
  }, []);
  


  return (
    <div className="px-20 py-10 bg-blueRibbon-500 text-mine-shaft-100 font-['Poppins'] mt-14 lg:mt-5">
      
      {/* Hero Section */}
      <div className="text-center mb-12 mt-14 md:mt-10">
        <Title  className="text-5xl lg:text-6xl font-bold text-cyanAqua-400  ">About Us</Title>
        <Text size="lg" className="mt-3 text-mine-shaft-200 font-semibold">
          Discover our journey, meet our dedicated coaches, and see how we’re shaping the future of tennis.
        </Text>
      </div>

      {/* Coach Section */}
      <div className="my-16">
        <Title order={2} className="text-4xl font-semibold text-cyanAqua-400 text-center mb-6">
          Meet Our Coaches
        </Title>
        <div className="flex flex-wrap justify-center gap-8">
          {coaches.map((coach, index) => (
            <div >
            <Card key={index} shadow="md" className="bg-blueRibbon-400 text-center p-6 w-60 rounded-xl hover:bg-blueRibbon-700 transition-all "  data-aos="flip-right">
              <Avatar src={coach.avatar} size="xl" radius="50%" className="mb-4 mx-auto" />
              <Text size="lg" className="text-cyanAqua-400 font-bold">
                {coach.name}
              </Text>
              <Text size="sm" className="text-mine-shaft-200">{coach.title}</Text>
              <Divider my="sm" />
              <Text size="sm" className="text-mine-shaft-300">{coach.bio}</Text>
            </Card>
          </div>
          
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="my-16">
        <Title order={2} className="text-4xl font-semibold text-cyanAqua-400 text-center mb-6">
          Our Journey
        </Title>
        <div className="mx-auto max-w-2xl">
          <Timeline active={journey.length - 1} bulletSize={32} lineWidth={2}>
            {journey.map((event, index) => (
              <Timeline.Item
                key={index}
                title={<Text size="lg" className="text-cyanAqua-400 font-semibold">{event.year}</Text>}
                bullet={<IconTrophy size={20} />}
              >
                <Text size="sm" color="white">{event.description}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
     
    

    </div>
  );
};

export default AboutUs;