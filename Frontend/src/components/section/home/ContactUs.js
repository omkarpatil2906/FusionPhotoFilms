import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const ContactUs = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-8 w-8 text-[#2C3E50]" />,
      title: "Email Us",
      content: "fusionphotofilms@gmail.com",
      bgColor: "#F5F7FA",
      href: "mailto:fusionphotofilms@gmail.com",
      target: "_blank"
    },
    {
      icon: <Phone className="h-8 w-8 text-[#2C3E50]" />,
      title: "Call Us",
      content: "+91 8722119811",
      bgColor: "#F5F7FA",
      href: "tel:8722119811",
      target: "_blank"
    },
    {
      icon: <BsWhatsapp className="h-8 w-8 text-[#2C3E50]" />,
      title: "WhatsApp",
      content: "+91 8722119811",
      bgColor: "#F5F7FA",
      href: "https://wa.me/918722119811",
      target: "_blank"
    },

    {
      icon: <Instagram className="h-8 w-8 text-[#2C3E50]" />,
      title: "Follow Us",
      content: "fusion_photography22",
      bgColor: "#F5F7FA",
      href: "https://www.instagram.com/fusion_photography22?igsh=aXI2N2l4dHZqN3d2",
      target: "_blank"
    },
  ];


  return (
    <div className="w-full pt-16 lg:pt-5 bg-white  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-4xl font-belleza-regular tracking-widest uppercase font-bold text-customColor mb-1 text-center ">Let’s Connect</h2>

        <p className="text-[#5D6D7E] text-[8px] lg:text-xs font-belleza-regular text-center mb-8 max-w-2xl mx-auto">
          We'd love to hear from you. Connect with us through any of these platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              target={info.target}
              rel="noopener noreferrer"
              className="block rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-52 group no-underline"
              style={{ backgroundColor: info.bgColor }}
            >
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="mb-4 p-3 rounded-full bg-[#E8ECF2] group-hover:bg-white transition-colors duration-300">
                  {info.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 font-raleway tracking-wider text-[#1c7e80]">{info.title}</h3>
                <p className="text-[#5D6D7E] text-center font-poppins-thin text-sm">{info.content}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="w-full mt-12 h-[450px]">
        <iframe
          title="Fusion Photo Films Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15611.54772162096!2d74.51427181967632!3d15.778415509173984!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf68a1c5680477%3A0x8878b77343ba4f8!2sYellur%2C%20Karnataka%20590005!5e0!3m2!1sen!2sin!4v1747836572100!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className=""
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;