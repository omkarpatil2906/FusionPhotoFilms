import React from 'react';
import { Link } from 'react-router-dom';
import fusionFilms from '../../common/asset/fusionLogo2.png'

function Footer() {
    return (
        <footer className="bg-[#324156] text-white">
            {/* Main Footer Container */}
            <div className="container flex flex-col justify-center items-center mx-auto px-4 py-7">
                {/* Brand Section */}
                <div className="flex flex-col items-center space-y-2 justify-center mb-12">
                    {/* <h3 className="text-2xl md:text-3xl font-bold text-center tracking-[5px] md:tracking-[10px] uppercase font-raleway mb-3">
                        Fusion Films
                    </h3> */}
                    <img src={fusionFilms} alt="" className='md:h-14 h-12' />
                    <p className="text-xs md:text-base tracking-wider  text-center font-montserrat text-gray-300 mb-4">
                        Capturing life's precious moments, one frame at a time.
                    </p>
                    <div className="h-[2px] w-16 md:w-24 bg-[#009aa0]"></div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 w-[95%] lg:w-[90%] md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
                    {/* Social Media Section */}
                    <div className="space-y-6">
                        <h4 className="text-lg md:text-xl tracking-widest uppercase font-bold font-raleway after:content-[''] after:block after:w-16 after:h-1 after:bg-[#009aa0] after:mt-2">
                            Services
                        </h4>

                        <ul className="space-y-4 text-sm font-montserrat">
                            <li>Wedding</li>
                            <li>Portrait</li>
                            <li>Commercial</li>
                            <li>Pre-wedding</li>
                            <li>Birthday</li>
                            <li>Event</li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg md:text-xl tracking-widest uppercase font-bold font-raleway after:content-[''] after:block after:w-16 after:h-1 after:bg-[#009aa0] after:mt-2">
                            Quick Links
                        </h4>

                        <ul className="space-y-3 font-montserrat">
                            {[
                                { to: "/", text: "Stories" },
                                { to: "/connect", text: "Connect" },
                                { to: "/ourWork", text: "Our Work" },
                                { to: "/ourVision", text: "Our Vision" },
                            ].map((link) => (
                                <li key={link.text}>
                                    <Link
                                        to={link.to}
                                        className="text-sm hover:text-[#009aa0]  transition-colors duration-300"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h4 className="text-lg md:text-xl tracking-widest uppercase font-bold font-raleway after:content-[''] after:block after:w-16 after:h-1 after:bg-[#009aa0] after:mt-2">
                            Contact Us
                        </h4>
                        <div className="space-y-3 font-montserrat">
                            <div className="flex items-center space-x-3 text-sm ">
                                {/* <Phone size={16} className="text-[#009aa0]" /> */}
                                <span>+91 8722119811</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm ">
                                {/* <Mail size={16} className="text-[#009aa0]" /> */}
                                <a href="mailto:fusionphotofilms@gmail.com" className="hover:text-[#009aa0] transition-colors duration-300">
                                    fusionphotofilms@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-sm ">
                                {/* <MapPin size={16} className="text-[#009aa0]" /> */}
                                <span>Yellur Belgaum, Karnataka</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-2 border-t border-gray-700">
                    <p className="text-[10px] lg:text-base text-center text-gray-400 font-montserrat">
                        &copy; 2024 Fusion Photo &amp; Films. Capturing memories that last a lifetime.
                    </p>
                    <p className="text-[8px] lg:text-xs  text-center text-gray-400 font-montserrat">
                        Designed & Developed by Omkar.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;