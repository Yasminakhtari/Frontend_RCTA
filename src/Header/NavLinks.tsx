//import { url } from "inspector";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";

const NavLinks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: "Players", url: "players" },
    { name: "Session", url: "tournaments" },
    { name: "Rankings", url: "rankings" },
    { name: "News", url: "news" },
    { name: "About Us", url: "about-us" },
    { name: "Sign Up", url: "signup" },
    { name: "Contact Us", url: "contact-us" },
  ];

  const location = useLocation();

  return (
    <div>
      {/* Hamburger Menu Icon for Small Screens */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Horizontal Links for Medium and Larger Screens */}
      <div className="hidden md:flex gap-5 h-full text-mine-shaft-200 items-center">
        {links.map((link, index) => (
          <div
            key={index}
            className={`${
              location.pathname === "/" + link.url
                ? "border-blueRibbon-950 text-blueRibbon-600"
                : "border-transparent"
            } border-t-[3px] h-full items-center`}
          >
            <Link key={index} to={link.url}>
              {link.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-blueRibbon-600 z-10 flex flex-col items-start p-4 md:hidden">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className={`block w-full py-2 px-4 text-white ${
                location.pathname === "/" + link.url
                  ? "bg-blueRibbon-700"
                  : "hover:bg-blueRibbon-700"
              }`}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLinks;
