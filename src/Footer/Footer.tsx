import { IconAdCircle, IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { footerLinks } from '../Data/Data';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (

    location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/gallery"? 
    <div className='pt-20 pb-5 flex gap-2 justify-around bg-blueRibbon-600 font-["poppins"]'>
      {/* LEFT - Academy Info */}
      <div className='w-1/4 flex flex-col gap-4'> 
        <div className='flex gap-3 items-center text-blueRibbon-400'>
            <IconAdCircle className='h-10 w-10 stroke={1.25}'/>
          <div className='text-xl font-semibold'>RC Tennis Academy</div>
        </div>
        <div className='text-sm text-mine-shaft-300'>
          Join our academy and start your journey to becoming a tennis pro! We offer professional coaching, tournaments, and a supportive community for all skill levels.
        </div>
        <div className='flex gap-3 text-blueRibbon-400 [&>div]:bg-blueRibbon-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700'>
          <div><IconBrandFacebook /></div>
          <div><IconBrandInstagram /></div>
          <div><IconBrandX /></div>
        </div>
      </div>

      {/* RIGHT - Footer Links */}
      {
        footerLinks.map((item, index) => (
          <div key={index}>
            <div className='text-lg font-semibold mb-4 text-blueRibbon-400'>{item.title}</div>
            {
              item.links.map((link, index) => (
                <div key={index} className='text-mine-shaft-100 text-sm hover:text-blueRibbon-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out'>
                  {link}
                </div>
              ))
            }
          </div>
        ))
      }
    </div> : <></>
  );
}

export default Footer;
