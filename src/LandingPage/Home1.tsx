import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Home1 = () => {
  return (
    <div className="flex px-20 items-center ">

        {/* Left Section */}
        <div className="flex flex-col w-[45%] px-16">
            <div className="text-6xl font-bold text-mine-shaft-100 leading-tight [&>span]:text-blueRibbon-900">
                Join the <span>Ultimate Tennis</span> Experience
            </div>
            <div className="text-lg text-mine-shaft-200">
                Discover a community of players, exciting tournaments, and exclusive training programs at our tennis club.
            </div>
            <div className="flex gap-3 mt-5">
                <TextInput 
                    className=" bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
                    placeholder="Search tournaments or training"
                    label="Explore"
                    variant="unstyled"
                />
                <TextInput 
                    className=" bg-blueRibbon-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100"
                    placeholder="Location (e.g., Texas)"
                    label="Location"
                    variant="unstyled"
                />
                <div className="flex items-center justify-center h-full w-20 bg-blueRibbon-600 text-mine-shaft-100 rounded-lg p-2 hover:bg-blueRibbon-500 cursor-pointer ">
                    <IconSearch className="h-[85%] w-[85%]"/>
                </div>
            </div>
        </div>

        {/* Right Section */}
        <div className="w-[55%] flex items-center justify-center">
            <div className="w-[30rem] relative">
                <img src="/tennis.png" alt="Tennis club" />
                <div className="absolute -right-10 top-[50%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md">
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
                <div className="absolute -left-10 top-[28%] w-fit border-blueRibbon-900 border rounded-lg p-2 backdrop-blur-md mb-3 flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 p-1 bg-blueRibbon-900 rounded-lg">
                            <img src="/tenis logo.png" alt="tennis logo" />
                        </div>
                        <div className="text-sm text-mine-shaft-100">
                            <div>Upcoming Tournament</div>
                            <div className="text-mine-shaft-200 text-xs">Texas, USA</div>
                        </div>
                    </div>

                    <div className="flex gap-2 text-mine-shaft-200 text-sm justify-between">
                        <span>Aug 15, 2024</span>
                        <span>Open to All Levels</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home1;
