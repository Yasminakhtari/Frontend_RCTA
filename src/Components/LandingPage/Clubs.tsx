import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../apiConfig";

interface ImageData {
  id: number;
  groups: string | null;
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

const Clubs = () => {
  const [clubLogos, setClubLogos] = useState<ImageData[]>([]);
  const [aboveCarouselHeading, setAboveCarouselHeading] = useState<ImageData | null>(null);

  useEffect(() => {
    const fetchClubLogo = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
          params: {
            groups: "Home Page"
          },
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);
        const clubLogoData = response.data.filter((item: any) =>
          item.category === "Partnership with clubs" && item.subcategory === "Club Image"
        );
        setClubLogos(clubLogoData);

        const aboveCarouselData = response.data.find((item: any) =>
          item.category === "Above Carousel" && item.subcategory === "Heading"
        );
        console.log(aboveCarouselData);
        setAboveCarouselHeading(aboveCarouselData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClubLogo();
  }, []);

  // Function to render heading with number styled differently
  const renderHeadingWithStyledNumber = (text: string | null) => {
    if (!text) return null;

    // Regular expression to find numbers in the text
    const regex = /(\d+\+?)/g;

    // Replace numbers with a styled span
    const parts = text.split(regex).map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="text-blueRibbon-950">
            {part}
          </span>
        );
      }
      return part;
    });

    return parts;
  };

  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-10">
        {aboveCarouselHeading?.name
          ? renderHeadingWithStyledNumber(aboveCarouselHeading.name)
          : "In Partnership with Tennis Clubs"}
      </div>
      <Marquee pauseOnHover>
        {clubLogos.map((image, index) => (
          <div className="mx-8 px-2 py-1 hover:bg-blueRibbon-950 rounded-xl cursor-pointer" key={index}>
            <img
              className="h-14"
              src={image.imgUrl}
              alt={`Club ${index + 1}`}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Clubs;
