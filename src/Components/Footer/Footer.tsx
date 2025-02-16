import { IconAdCircle, IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { footerLinks } from '../../Data/Data';
import { Link, useLocation } from 'react-router-dom';
import xlogo from "./x logo.jpeg"

const Footer = ({onClick=()=>{}}) => {

  const location = useLocation();
  return (
    location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/gallery" && location.pathname !== "/testimonial" &&  location.pathname !== "/servicetable" && location.pathname !== "/admin"? 
    <div className='pt-20 pb-10 bg-blueRibbon-600 font-["poppins"] px-5 lg:px-20'>
      <div className='flex flex-col lg:flex-row gap-5'>
        {/* LEFT - Academy Info */}
        <div className='w-full lg:w-1/4 flex flex-col gap-4'>
          <div className='flex gap-3 items-center  !text-gray-900'>
            <IconAdCircle className='h-10 w-10 stroke-1.25' />
            <div className='text-xl font-semibold'>RC Tennis Academy</div>
          </div>
          <div className='text-sm text-mine-shaft-200'>
            Join our academy and start your journey to becoming a tennis pro! We offer professional coaching, tournaments, and a supportive community for all skill levels.
          </div>
          <div className='flex gap-3 !text-gray-900 [&>div]:bg-blueRibbon-900 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700'>
          
         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                  alt="Facebook" 
                  className="h-10 w-10" 
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                  alt="Instagram" 
                  className="h-10 w-10" 
                />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img 
                  src={xlogo} 
                  alt="X" 
                  className="h-10 w-10" 
                />
              </a>
          

          </div>
        </div>

        {/* RIGHT - Footer Links */}
        <div className='w-full lg:w-3/4'>
          <div className='overflow-hidden'>
            <div className='flex  justify-between gap-8 lg:gap-10 lg:ml-20 '>
              {footerLinks.map((item, index) => (
                <div key={index} className='w-fit '>
                  <div className='text-lg font-semibold mb-4 !text-gray-900'>{item.title}</div>
                  {item.links.map((link, index) => (
                    <div key={index} className='text-mine-shaft-100 text-sm hover:text-blueRibbon-400 cursor-pointer mb-1 hover:translate-x-1 transition duration-300 ease-in-out'>
                     
                      <Link key={index} to={link.url} onClick={onClick} >{link.val}</Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div> 
    : <></>
  );
}

export default Footer;
