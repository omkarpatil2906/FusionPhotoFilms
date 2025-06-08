import React, { useEffect, useState } from "react";
import FusionLogo from "../../common/asset/fusionColorLogo.png";
import { TfiMenu } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
// import { FaCamera, FaHome, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleBodyScroll = (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleMenu = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      toggleBodyScroll(newOpen);

      // If there's a hash in the URL, scroll to the section after menu closes
      if (!newOpen && location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }

      return newOpen;
    });
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(path.replace("/#", ""));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, []);

  const isHomePage = location.pathname === "/";

  const navbarClass = `
   fixed lg:relative w-full z-50 transition-all duration-300 ${
     open ? "bg-white" : "bg-transparent "
   } lg:bg-white lg:relative
    ${!isHomePage || isScrolled ? "bg-white " : "bg-transparent"}
`;

  return (
    <div className={navbarClass}>
      <div className=" w-full p-2 lg:p-3 ">
        <div className="flex justify-between items-center   w-full lg:hidden">
          <img src={FusionLogo} className="h-10" alt="" />
          <div className="pt-1">
            <button onClick={toggleMenu}>
              {open ? (
                <IoClose className="text-xl text-customColor" />
              ) : (
                <TfiMenu className="text-xl text-customColor" />
              )}
            </button>
          </div>
        </div>
        <ul
          className={`fixed left-0 right-0 bg-white p-5 shadow-lg  overflow-hidden`}
          style={{
            top: "56px",
            maxHeight: open ? "1000px" : "0",
            opacity: open ? "1" : "0",
            visibility: open ? "visible" : "hidden",
            transition: open
              ? "max-height 0.7s ease-in-out, opacity 0.7s ease-in-out, visibility 0s"
              : "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0s 0.3s",
          }}
        >
          <div className="space-y-5 font-semibold text-sm  tracking-wider font-montserrat">
            <li onClick={toggleMenu}>
              <Link to="/" className="flex items-center  space-x-2">
                <span>Stories</span>
              </Link>
            </li>

            <li onClick={toggleMenu}>
              <Link to="/ourVision" className="flex items-center   space-x-2">
                <span>Our Vision</span>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/connect" className="flex  items-center space-x-2">
                <span>Connect</span>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/ourWork" className="flex items-center  space-x-2">
                <span>Our Work</span>
              </Link>
            </li>
          </div>

        </ul>

        <div className="hidden w-full lg:block pt-4 space-y-3 ">
          <img src={FusionLogo} className="h-14 mx-auto" alt="" />
          <h1 className="text-center text-black font-belleza-regular text-xs tracking-wider font-semibold uppercase">
            Behind Every Picture There Is a Story To Tell
          </h1>
          <div className="flex justify-center items-center">
            <ul className="text-black font-belleza-regular uppercase text-sm font-semibold w-[50%] flex justify-between items-center">
              <li
                className={`${
                  isActive("/")
                    ? "bg-[#1c7e80] text-white"
                    : "hover:bg-[#1c7e80]"
                } flex space-x-2 items-center cursor-pointer px-5 rounded-xl transition-all duration-300 p-1 hover:text-white`}
              >
                {/* <FaHome className="text-xl text-[#1c7e80]" /> */}
                <Link to="/" className="tracking-widest">
                  Stories
                </Link>
              </li>
              <li
                className={`${
                  isActive("/ourVision")
                    ? "bg-[#1c7e80] text-white"
                    : "hover:bg-[#1c7e80]"
                } flex space-x-2 items-center cursor-pointer px-5 rounded-xl ease-in-out transition-all duration-300 p-1 hover:text-white`}
              >
                {/* <FaInfoCircle className="text-xl text-[#1c7e80]" /> */}
                <Link to="/ourVision" className="tracking-widest">
                  Our Vision
                </Link>
              </li>
              <li
                className={`${
                  isActive("/connect")
                    ? "bg-[#1c7e80] text-white"
                    : "hover:bg-[#1c7e80]"
                } flex space-x-2 items-center cursor-pointer px-5 rounded-xl transition-all duration-300 p-1 hover:text-white`}
              >
                {/* <FaPhoneAlt className="text-xl text-[#1c7e80]" /> */}
                <Link to="/connect" className="tracking-widest">
                  Connect
                </Link>
              </li>
              <li
                className={`${
                  isActive("/ourWork")
                    ? "bg-[#1c7e80] text-white"
                    : "hover:bg-[#1c7e80]"
                } flex space-x-2 items-center cursor-pointer px-5 rounded-xl transition-all duration-300 p-1 hover:text-white`}
              >
                {/* <FaCamera className="text-xl text-[#1c7e80]" /> */}
                <Link to="/ourWork" className="tracking-widest">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
