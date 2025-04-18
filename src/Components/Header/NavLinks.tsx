//import { url } from "inspector";
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({onClick=()=>{}}) => { // Accept the onClick prop
    
    
    const links = [
        { name: "Home", url: "" },
        { name: "About Us",url: "about-us"},
        {name:"Gallery" , url:"gallery"},
        {name:"Contact Us",url:"contact-us"},
        {name:"Products",url:"product"},
        {name:"Classes",url:"classes"},
        
        
    ];

    const location = useLocation();
  return (
            <div className='flex  flex-col md:flex-row gap-5 h-full text-mine-shaft-200 items-center'>
                { 
                    //in location.pathname we will get the path name now we compare to the path
                    links.map((link,index) => <div  key={index} className={`${location.pathname === "/" + link.url ? "border-blueRibbon-950 text-blueRibbon600" : "border-transparent"} border-t-[3px] h-full items-center`}>
                        <Link key={index} to={link.url} onClick={onClick}> {link.name}</Link>
                    </div>)
                }
            </div> 
  )
}

export default NavLinks;