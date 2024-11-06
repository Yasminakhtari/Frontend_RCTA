import Clubs from "../LandingPage/Clubs"
import Home1 from "../LandingPage/Home1"
import LandingMediumSection from "../LandingPage/LandingMediumSection"
import Subscribe from "../LandingPage/Subscribe"
import Testimonials from "../LandingPage/Testimonials"

const HomePage = () => {
  return (
    <div className='min-h[100vh] bg-mine-shaft-950 font-["poppins"]'>
        <Home1/>
        <Clubs/>
        <LandingMediumSection/>
        <Testimonials/>
        <Subscribe/>
    </div>
  )
}

export default HomePage