import { IconAnchor, IconHome, IconHome2 } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import imageUrl from '../assets/images/tenisbg.jpg';
import { Button } from "@mantine/core";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    opacity: '80%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    background: `linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
    filter: 'brightness(1) contrast(1.5)',
  };

  return (
    <div style={divStyle} className='min-h-[90vh] font-["poppins"] overflow-hidden relative'>
     
      <Button leftSection={<IconHome size={20}/>}  my="md" className="!absolute  bottom-24 md:top-2 left-10 md:left-5 z-10" color="blueRibbon.9" variant="filled" onClick={() => navigate("/")}>Back To Home</Button>

      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${
          location.pathname === '/login' ? '-translate-x-[91%] md:-translate-x-1/2' : 'translate-x-0'
        }`}
      >
        {/* SignUp Component */}
        <SignUp />

        {/* Center Panel */}
        <div
          className={`w-1/2 h-full   hidden md:flex transition-all duration-1000 ease-in-out ${
            location.pathname === '/login'
              ? 'rounded-r-[200px]'
              : 'rounded-l-[200px]'
          } bg-blueRibbon-800/60 flex items-center flex-col justify-center gap-5`}
        >
          
          <div className="flex flex-col items-center">
            {/* Optional Logo/Icon */}
            {/* <IconAnchor className="h-16 w-16" /> */}
            <h1 className="text-6xl font-['Bebas']">RC TENNIS ACADEMY</h1>
            <p className="text-2xl mt-4 font-semibold font-['Bebas']">
              From Practice to Podium.
            </p>
            {/* Center Button */}
            {/* <div className="mt-8 flex justify-between items-center ">
            <Button leftSection={<IconHome size={20}/>}  my="md" className=" w-56 h-14" color="blueRibbon.9" variant="filled" onClick={() => navigate("/")}>Home</Button>
            </div> */}
          </div>
        </div>

        {/* Login Component */}
        <Login />

        
      </div>
    </div>
  );
};

export default SignUpPage;

