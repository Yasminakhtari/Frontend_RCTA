import { Avatar, Card, Timeline, Text, Divider, Title, Button } from "@mantine/core";
import { IconTrophy } from "@tabler/icons-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../apiConfig";

interface someData {
  id: number;
  groups: string;
  category: string | null;
  subcategory: string | null;
  imgUrl: string | " ";
  name: string | null;
  description: string | null;
  duration: number | null;
  price: number | null;
  status: string | null;
  discount: number;
  disbegindate: string | null; // Using string to represent ISO date format
  disenddate: string | null;   // Using string to represent ISO date format
  disquantity: number | null;
  phoneNumber: string | null;
}

const AboutUs = () => {
  const [aboutusData, setAboutusData] = useState<String[]>([]);
  const [coaches, setCoaches] = useState([]);
  const [journeys, setJourney] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track the starting index for carousel
  const [descriptionData, setDescriptionData] = useState<someData | null>(null);
  const cardsPerPage = 3; // Number of cards to display on larger screens
  const visibleCards = coaches.slice(currentPage, currentPage + cardsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) =>
      prev + cardsPerPage < coaches.length ? prev + cardsPerPage : 0
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) =>
      prev - cardsPerPage >= 0 ? prev - cardsPerPage : Math.max(coaches.length - cardsPerPage, 0)
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
          params: { group: "About-Us" },
          headers: { "Content-Type": "application/json" },
        });
        const coachesData = response.data.filter((item: any) => item.category === "coach");
        const journeyData = response.data.filter((item: any) => item.category === "Journey");
        setCoaches(coachesData);
        setJourney(journeyData);

        const descriptionData = response.data.find((item: any) => item.category === "About" && item.subcategory === "Description");
        if (descriptionData) {
          // Clean up description: remove HTML tags and inline styles
          descriptionData.description = descriptionData.description.replace(/<[^>]*>/g, "").trim();
        }
        console.log(descriptionData);
        setDescriptionData(descriptionData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-5 py-10 lg:px-20 bg-blueRibbon-500 text-mine-shaft-100 font-['Poppins'] mt-14 lg:mt-5">
      {/* Hero Section */}
      <div className="text-center mb-12 mt-14 md:mt-10">
        <Title className="text-4xl md:text-5xl lg:text-6xl font-bold text-cyanAqua-400">About Us</Title>
        <Text size="lg" className="mt-3 text-mine-shaft-200 font-semibold">
          {descriptionData?.description || "Discover our journey, meet our dedicated coaches, and see how we’re shaping the future of tennis."}
        </Text>
      </div>

      {/* Coach Section */}
      <div className="my-16">
        <Title order={2} className="text-3xl md:text-4xl font-semibold text-cyanAqua-400 text-center mb-9">
          Meet Our Coaches
        </Title>

        {/* Desktop View: Carousel */}
        <div className="hidden md:flex relative items-center justify-between">
          <Button
            onClick={prevPage}
            className="absolute left-0 z-10 !bg-gray-900 hover:bg-gray-700 text-white p-2"
          >
            {`<<`}
          </Button>

          <div className="flex justify-center items-center gap-6 overflow-hidden w-full">
            {visibleCards.map((coach: any, index: any) => (
              <Card
                key={coach.id || index}
                shadow="md"
                className="bg-blueRibbon-400 text-center h-80 p-6 w-60 rounded-xl hover:bg-blueRibbon-700 transition-all"
                data-aos="flip-right"
              >
                <Avatar src={coach.avatar} size="xl" radius="50%" className="mb-4 mx-auto" />
                <Text size="lg" className="text-cyanAqua-400 font-bold">
                  {coach.name}
                </Text>
                <Text size="sm" className="text-mine-shaft-200">{coach.title}</Text>
                <Divider my="sm" />
                <Text className="text-mine-shaft-300 truncate">
                  {coach.description.replace(/<[^>]*>/g, "")}
                </Text>
              </Card>
            ))}
          </div>

          <Button
            onClick={nextPage}
            className="absolute right-0 z-10 !bg-gray-900 hover:bg-gray-700 text-white p-2"
          >
            {`>>`}
          </Button>
        </div>

        {/* Mobile View: Scrollable Cards */}
        <div className="flex md:hidden overflow-x-scroll gap-4 px-2 no-scrollbar">
          {coaches.map((coach: any, index: any) => (
            <Card
              key={coach.id || index}
              shadow="md"
              className="bg-blueRibbon-400 text-center h-80 p-6 w-60 rounded-xl hover:bg-blueRibbon-700 transition-all flex-shrink-0"
              data-aos="fade-up"
            >
              <Avatar src={coach.avatar} size="lg" radius="50%" className="mb-4 mx-auto" />
              <Text size="md" className="text-cyanAqua-400 font-bold">
                {coach.name}
              </Text>
              <Text size="sm" className="text-mine-shaft-200">{coach.title}</Text>
              <Divider my="sm" />
              <Text className="text-mine-shaft-300 truncate">
                {coach.description.replace(/<[^>]*>/g, "")}
              </Text>
            </Card>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="my-16">
        <Title order={2} className="text-3xl md:text-4xl font-semibold text-cyanAqua-400 text-center mb-6">
          Our Journey
        </Title>
        <div className="mx-auto max-w-2xl">
          <Timeline active={journeys.length - 1} bulletSize={32} lineWidth={2}>
            {journeys.map((event: any, index) => (
              <Timeline.Item
                key={index}
                title={
                  <Text size="lg" className="text-cyanAqua-400 font-semibold">
                    {event.subcategory}
                  </Text>
                }
                bullet={<IconTrophy size={20} />}
              >
                <Text size="sm" color="white">
                  {event.name}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
