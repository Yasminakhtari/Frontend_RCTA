import { Badge, Tabs } from "@mantine/core";
import { students, coachess, achievements } from "../../Data/Data";
import Images from "./Images";
import Marquee from "react-fast-marquee";


const GalleryTabs = () => {

  const studentImages = students.map((imageName) => ({
    src: `/Students/${imageName}.png`,
    alt: imageName,
  }));

  const coachImages = coachess.map((imageName) => ({
    src: `/Coach/${imageName}.png`,
    alt: imageName,
  }));

  const achievementImages = achievements.map((imageName) => ({
    src: `/Achievements/${imageName}.png`,
    alt: imageName,
  }));

  return (
    <div className="mt-5 w-full p-0 px-5 mt-24 lg:mt-5">
      <div className="md:text-2xl font-semibold flex items-center">
        Media/Gallery
        <Badge ml="sm" variant="light" size="sm" color="blueRibbon.6">
          Active
        </Badge>
      </div>
      <div className="font-medium text-mine-shaft-800 mb-5">RC TENNIS ACADEMY</div>

      <Tabs variant="outline" radius="lg" defaultValue="all">
        {/* Tab Titles */}
        <Tabs.List className="md:text-lg text-sm text-blueRibbon-700 font-semibold mb-5 [&_button[data-active='true']]:text-blueRibbon-950">
          <Tabs.Tab value="all" className="">All</Tabs.Tab>
          <Tabs.Tab value="coaches">Coaches</Tabs.Tab>
          <Tabs.Tab value="students">Students</Tabs.Tab>
          <Tabs.Tab value="achievement">Achievements</Tabs.Tab>
        </Tabs.List>

        {/* Upload Button */}
        {/* <div>
          <ImageUpload onImageUpload={() => console.log("uploaded")} />
        </div> */}

        {/* Tab Content */}
        <Tabs.Panel value="all">
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...coachImages, ...studentImages, ...achievementImages].map((image, index) => (
              <Images key={index} {...image} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="coaches">
          <div className="mt-10">
            <Marquee speed={50}>
              <div className="flex gap-4">
                {coachImages.map((image, index) => (
                  <Images key={index} {...image} />
                ))}
              </div>
            </Marquee>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="students">
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {studentImages.map((image, index) => (
              <Images key={index} {...image} />
            ))}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="achievement">
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {achievementImages.map((image, index) => (
              <Images key={index} {...image} />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>


    </div>
  );
};

export default GalleryTabs;
