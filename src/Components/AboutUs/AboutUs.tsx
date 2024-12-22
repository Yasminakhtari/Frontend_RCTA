import { Avatar, Card, Timeline, Text, Divider, Title, Button } from "@mantine/core";
import { journey, coaches } from "../../Data/Data";
import { IconTrophy } from "@tabler/icons-react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import axios from "axios";

const AboutUs = () => {

  const [aboutusData, setAboutusData] = useState<String[]>([]);
  const [coaches, setCoaches] = useState([]);
  const [journeys, setJourney] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const firstIndex = 0;
  const lastIndex = 3;

  const currentItems = coaches?.slice(firstIndex, currentPage * lastIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    AOS.init({
      duration: 7000,
      once: true, // animation happens only once when scrolling down
    });
    AOS.refresh(); // To refresh the AOS library and detect new elements
  }, []);

  //////////////////////////////////
  //let token = JSON.parse(localStorage.getItem("token") || "")
  //////////////////////
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/v1/getFilteredTennis', {
          params: {
            group: "About-Us"
          },
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);


        setAboutusData(response.data)
        const coachesData = response.data.filter((item: any) => item.category === "coach");
        const journeyData = response.data.filter((item: any) => item.category === "Journey");

        setCoaches(coachesData);
        setJourney(journeyData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata()
  }, [])

  console.log(coaches)
  console.log(journeys)
  ///////////////////////////



  return (
    <div className="px-20 py-10 bg-blueRibbon-500 text-mine-shaft-100 font-['Poppins'] mt-14 lg:mt-5">

      {/* Hero Section */}
      <div className="text-center mb-12 mt-14 md:mt-10">
        <Title className="text-5xl lg:text-6xl font-bold text-cyanAqua-400  ">About Us</Title>
        <Text size="lg" className="mt-3 text-mine-shaft-200 font-semibold">
          Discover our journey, meet our dedicated coaches, and see how we’re shaping the future of tennis.
        </Text>
      </div>

      {/* Coach Section */}
      <div className="my-16">

        <Title order={2} className="text-4xl font-semibold text-cyanAqua-400 text-center mb-9">
          Meet Our Coaches
        </Title>

        <div className=" relative flex justify-center items-center gap-8 mt-8 ">
          <Button className="absolute left-0 bg-blue-900 cursor-pointer"> prev </Button>

          {currentItems.length !== 0 && currentItems.map((coach: any, index: any) => (

            <div className="" >
              <Card key={coach.id || index} shadow="md" className="bg-blueRibbon-400 text-center h-80 p-6 w-60 rounded-xl hover:bg-blueRibbon-700 transition-all " data-aos="flip-right">
                <Avatar src={coach.avatar} size="xl" radius="50%" className="mb-4 mx-auto" />
                <Text size="lg" className="text-cyanAqua-400 font-bold">
                  {coach.name}
                </Text>
                <Text size="sm" className="text-mine-shaft-200">{coach.title}</Text>
                <Divider my="sm" />
                <Text className="text-mine-shaft-300">{coach.description.replace(/<[^>]*>/g, "")}</Text>
              </Card>
            </div>

          ))}

          <Button className="absolute right-0 z-10 bg-blue-950 cursor-pointer" > Next </Button>
        </div>
      </div>

      {/* Journey Section */}
      <div className="my-16">
        <Title order={2} className="text-4xl font-semibold text-cyanAqua-400 text-center mb-6">
          Our Journey
        </Title>
        <div className="mx-auto max-w-2xl">
          <Timeline active={journey.length - 1} bulletSize={32} lineWidth={2}>
            {journeys.map((event: any, index) => (
              <Timeline.Item
                key={index}
                title={<Text size="lg" className="text-cyanAqua-400 font-semibold">{event.subcategory}</Text>}
                bullet={<IconTrophy size={20} />}
              >
                <Text size="sm" color="white">{event.name}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>



    </div>
  );
};

export default AboutUs;