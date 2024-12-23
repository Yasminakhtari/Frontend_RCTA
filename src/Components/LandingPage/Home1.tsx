import { Avatar, TextInput } from "@mantine/core";
import { IconArrowUp, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import raphel from "./raphael.png"
import axios from "axios";
import { base_url } from "../../apiConfig";


type Tournament = {
  id: number;
  groups: string;
  category: string;
  subcategory: "Location" | "select" | "message"; // Restrict to valid subcategories
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

// export const base_url = "https://backend-rcta.onrender.com/api/v1";
// export const base_url = "http://localhost:8082/api/v1";

const Home1 = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [homePageData,setHomePageData] = useState<Tournament[]>([]);
    ////////////////////////////////////
    useEffect(()=>{

      const fetchData = async()=>{
        try{
          const response = await axios.get(`${base_url}/v1/getFilteredTennis`,{
            params:{
              group:"HomePage"
            },
            headers:{
              // Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
            
          })

          console.log(response);
          // setHomePage(response);
          setHomePageData(response.data);
        }catch(error){
          console.log(error);
        }
      }

      fetchData()
    },[]);
  
    ////////////////////////////////
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
    ////////////////////////
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  return (
    <div className="flex flex-col lg:flex-row items-center min-h-[90vh] gap-10 lg:gap-5 pt-4  px-5 mt-14 md:mt-5">
      {/* Left Section */}
      <div className="flex flex-col lg:w-[45%]">
        <div className="text-5xl lg:text-6xl font-bold text-mine-shaft-100 leading-tight [&>span]:text-blueRibbon-900">
          Join the <span>Ultimate Tennis</span> Experience
        </div>
        <div className="md:text-lg text-mine-shaft-200 mt-3">
          Discover a community of players, exciting tournaments, and exclusive training programs at our tennis club.
        </div>
        <div className="flex flex-col lg:flex-row gap-3 mt-5">
          <TextInput
            className="bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            placeholder="Search tournaments or training"
            label="Explore"
            variant="unstyled"
          />
          <TextInput
            className="bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
            placeholder="Location (e.g., Texas)"
            label="Location"
            variant="unstyled"
          />
          <div className="flex items-center justify-center h-12 lg:h-full w-12 lg:w-20 bg-blueRibbon-600 text-mine-shaft-100 rounded-lg p-2 hover:bg-blueRibbon-500 cursor-pointer">
            <IconSearch className="h-[70%] w-[70%]" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-[55%] flex flex-col items-center">
        <div className="w-full lg:w-[30rem] relative">
          <img
            className="rounded-lg object-cover w-full lg:w-auto"
            // src="/tennis.png"
            src={raphel}
            alt="Tennis club"
          />
          
          {/* Desktop version: Upcoming Tournament & Active Members */}
          <div className="hidden lg:block absolute -right-10 top-[50%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">
              2K+ Active Members
            </div>
            <Avatar.Group spacing="sm">
              <Avatar src="player1.jpg" radius="xl" />
              <Avatar src="player2.jpg" radius="xl" />
              <Avatar src="player3.jpg" radius="xl" />
              <Avatar radius="xl">+2K</Avatar>
            </Avatar.Group>
          </div>

          <div className="hidden lg:block absolute -left-10 top-[28%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md mb-3 flex flex-col gap-3">
          {
            homePageData && (
              <>
                <div className="flex gap-2 items-center">
                <div className="w-10 h-10 p-1 bg-blueRibbon-900 rounded-lg">
                  <img src="/tenis logo.png" alt="tennis logo" />
                </div>
                <div className="text-sm text-mine-shaft-100">
                  <div>Upcoming Tournament</div>
                  <div className="text-mine-shaft-200 text-xs">{homePageData.find(item => item.subcategory === "Location")?.name || "USA"}</div>
                </div>
              </div>

              <div className="flex gap-2 text-mine-shaft-200 text-sm justify-between">
                <span>Dec 25, 2024</span>
                <span>{homePageData.find(item => item.subcategory === "message")?.name || "Open To All "}</span>
              </div>
              </>
            )
          }
          </div>

          {/* Mobile version: Active Members and Upcoming Tournament (below image) */}
          <div className="lg:hidden mt-5 w-full flex flex-col items-center gap-4">
            <div className="w-full bg-black bg-opacity-50 text-white rounded-lg p-4">
              <div className="text-center text-sm text-mine-shaft-100 mb-2">2K+ Active Members</div>
              <Avatar.Group spacing="sm" className="justify-center">
                <Avatar src="player1.jpg" radius="xl" />
                <Avatar src="player2.jpg" radius="xl" />
                <Avatar src="player3.jpg" radius="xl" />
                <Avatar radius="xl">+2K</Avatar>
              </Avatar.Group>
            </div>

            <div className="w-full bg-black bg-opacity-50 text-white rounded-lg p-4">
              <div className="text-center text-sm text-mine-shaft-100 mb-2">Upcoming Tournament</div>
              <div className="text-sm text-mine-shaft-200">Dec 25, 2024 - Pleasant Hill, CA</div>
              <div className="text-xs text-mine-shaft-200">Open to All Levels</div>
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
