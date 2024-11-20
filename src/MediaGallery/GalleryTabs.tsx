import { Badge, Tabs } from "@mantine/core"
import Gallery from "./Gallery"
import {students,coachess,achievements} from "../Data/Data"
import Images from "./Images";
import Marquee from "react-fast-marquee";

const GalleryTabs = () => {
  // Combine all the data into a single array for easier mapping
  const studentImages = students.map((imageName, index) => ({
    src: `/Students/${imageName}.png`, // Assuming images are PNG files stored in the `data` folder
    alt: imageName,
    colSpan: index % 3 === 0 ? 4 : 3,  // Example for dynamic column span (adjust as needed)
    rowSpan: 6, // Example row span (adjust as needed)
  }));

  const coachImages = coachess.map((imageName, index) => ({
    src: `/Coach/${imageName}.png`, // Assuming images for coaches are in public/Coaches folder
    alt: imageName,
    colSpan: index % 3 === 0 ? 4 : 3,
    rowSpan: 6,
  }));

  const achievementImages = achievements.map((imageName, index) => ({
    src: `/Achievements/${imageName}.png`, // Assuming images for achievements are in public/Achievements folder
    alt: imageName,
    colSpan: index % 3 === 0 ? 4 : 3,
    rowSpan: 6,
  }));


  return (
    <div className="mt-5 w-full px-5">
    <div className="text-2xl font-semibold  flex items-center">Media/Gallery <Badge  ml="sm"  variant="light" size="sm" color="blueRibbon.6">Active</Badge></div>
    <div className="font-medium text-mine-shaft-800 mb-5">RC TENNIS ACADEMY</div>
    <div>
            <Tabs variant='outline' radius="lg" defaultValue="all">
                        <Tabs.List className="[&_button]:!text-lg text-blueRibbon-700 font-semibold mb-5 [&_button[data-active='true']]:text-blueRibbon-950">
                            <Tabs.Tab value="all">All</Tabs.Tab>
                            <Tabs.Tab value="coaches">Coaches</Tabs.Tab>
                            <Tabs.Tab value="students">Students</Tabs.Tab>
                            <Tabs.Tab value="achievement">Achievements</Tabs.Tab>
                        </Tabs.List>

                  {/* Here all conditon will be applied               */}
                  {/* All Images Tab */}
                  <Tabs.Panel value="all">
                            {/* <div className="mt-10 flex flex-wrap gap-5 justify-around"> */}
                            <div className="mt-10 grid gap-4 grid-cols-12">
                                {[...coachImages, ...studentImages, ...achievementImages].map((image, index) => (
                                    <Images key={index} {...image} />
                                ))}
                            </div>
                  </Tabs.Panel>

                  {/* Coaches Tab */}
                <Tabs.Panel value="coaches">
                        <div className="mt-10 flex flex-wrap gap-5 justify-around ">
                          {/* Render only coach images */}
                          <Marquee  speed={100} >

                           <div className="flex gap-4">
                              {coachImages.map((image, index) => (
                                  <div className=" ">
                                    <Images key={index} {...image} />
                                  </div>
                                ))}
                           </div>
                          </Marquee>
                          
                        </div>
                </Tabs.Panel>

                {/* Students Tab */}
                <Tabs.Panel value="students">
                  <div className="mt-10 grid gap-4 grid-cols-12">
                    {/* Render only student images */}
                    {studentImages.map((image, index) => (
                      <Images key={index} {...image} />
                    ))}
                  </div>
                </Tabs.Panel>

                {/* Achievements Tab */}
                <Tabs.Panel value="achievement">
                  <div className="mt-10 flex flex-wrap gap-5 justify-around">
                    {/* Render only achievement images */}
                    {achievementImages.map((image, index) => (
                      <Images key={index} {...image} />
                    ))}
                  </div>
                </Tabs.Panel>

            </Tabs>
            <Gallery/>
      </div>
      
    </div>
  )
}

export default GalleryTabs
