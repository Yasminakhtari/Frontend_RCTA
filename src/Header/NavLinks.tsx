//import { url } from "inspector";
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
    const links = [
        { name: "Players", url: "players" },
        { name: "Session", url: "tournaments" },
        { name: "Rankings", url: "rankings" },
        { name: "News", url: "news" },
        { name: "about us",url: "about-us"},
        {name:"Sign Up",url:"signup"},
        {name:"Gallery" , url:"gallery"}
    ];

    const location = useLocation( );
  return (
            <div className='flex gap-5 h-full text-mine-shaft-200 items-center'>
                { 
                    //in location.pathname we will get the path name now we compare to the path
                    links.map((link,index) => <div  key={index} className={`${location.pathname === "/" + link.url ? "border-blueRibbon-950 text-blueRibbon600" : "border-transparent"} border-t-[3px] h-full items-center`}>
                        <Link key={index} to={link.url}> {link.name}</Link>
                    </div>)
                }
            </div> 
  )
}

export default NavLinks;