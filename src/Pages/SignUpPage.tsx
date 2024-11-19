
import { IconAnchor } from "@tabler/icons-react"
import SignUp from "../SignUpLogin/SignUp"
import Login from "../SignUpLogin/Login"
import { useLocation } from "react-router-dom"
import imageUrl from '../assets/images/tenisbg.jpg'

const SignUpPage = () => {
  const location = useLocation();
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize:'cover',
    opacity:'80%',
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center ',
    height: '100%',
    width: '100%',
    background: `linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
    filter: 'brightness(1) contrast(1.5)', 
  };
  // When our location will be signUp we have to show the signUp page and when our location is login we have to show the login page
  return (
    <div style={divStyle}  className='min-h-[90vh]  font-["poppins"] overflow-hidden'>
       
        
        <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname==='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
          <Login/>
          {/* Left */}
            <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname ==='/signup'?'rounded-r-[200px]':'rounded-l-[200px]'}  bg-blueRibbon-800/60 flex items-center  flex-col justify-center gap-5`}>

                <div className='flex gap-1 items-center text-blue-200'>
                  {/* <IconAnchor className='h-16 w-10 stroke={1.25}'/> */}
                  <div className='text-6xl font-semibold font-["Bebas"]' >RC TENNIS ACADEMY</div>
                </div>

                <div className='text-2xl text-mine-shaft-100 font-semibold font-["Bebas"]'>
                    From Practice to Podium.
                </div>
            </div>
          {/* Right */}
          <SignUp/>
        </div>
    </div>
  )
}

export default SignUpPage
