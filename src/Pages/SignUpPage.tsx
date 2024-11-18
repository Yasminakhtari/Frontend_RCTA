
import { IconAnchor } from "@tabler/icons-react"
import SignUp from "../SignUpLogin/SignUp"
import Login from "../SignUpLogin/Login"
import { useLocation } from "react-router-dom"

const SignUpPage = () => {
  const location = useLocation();
  // When our location will be signUp we have to show the signUp page and when our location is login we have to show the login page
  return (
    <div className='min-h-[90vh] bg-mine-shaft-950 font-["poppins"] overflow-hidden'>
       
        
        <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname==='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
          <Login/>
          {/* Left */}
            <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname == '/signup'?'rounded-r-[200px]':'rounded-l-[200px]'}  bg-blueRibbon-400 flex items-center  flex-col justify-center gap-5`}>

                <div className='flex gap-1 items-center text-brightSun-400'>
                  {/* <IconAnchor className='h-16 w-10 stroke={1.25}'/> */}
                  <div className='text-6xl font-semibold'>RC TENNIS ACADEMY</div>
                </div>

                <div className="text-2xl text-mine-shaft-300 font-semibold">
                    tagline
                </div>
            </div>
          {/* Right */}
          <SignUp/>
        </div>
    </div>
  )
}

export default SignUpPage
