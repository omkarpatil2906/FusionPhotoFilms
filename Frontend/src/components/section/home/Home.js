import React, { useEffect, useState } from "react";
import HomeGallary from "./HomeGallary";
import ContactUs from "./ContactUs";
import { useLocation } from "react-router-dom";
import AboutUs from "./AboutUs";
import { getOtherImages } from "../../services/ImagesServices";
import { useError } from "../../../context/ErrorContext";
import LoadingSpinner from "../../../common/loadingspinner/loadingSpinner";
import HomeVideos from "./HomeVideos";

function Home() {
  const [frontImage, setFrontImage] = useState("");
  const location = useLocation();

  const { setError } = useError();

  useEffect(() => {
    getOtherImages()
      .then((res) => {
        setFrontImage(res.data);
      })
      .catch((error) => {
        setError("Failed to fetch images. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      {/* this is home page section */}
      <div>
        {frontImage[0]?.frontPageImg ? (
          <img
            src={frontImage[0]?.frontPageImg}
            alt="home"
            loading="lazy"
            draggable="false"
            className="h-[600px] w-full object-cover"
          />
        ) : (
          <div className="grid justify-center items-center h-[600px]" >
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div className="text-center py-16 lg:py-24 space-y-4 bg-[#F7F9F2] flex flex-col justify-center items-center p-2 ">
        <h1 className="font-montserrat text-xl font-bold text-customColor border-2 px-4 border-customColor">
          BOOK YOUR DATE'S NOW
        </h1>
        <p className="font-raleway p-2">
          “Marriages are settled in heaven but celebrated on earth. The unity of
          two souls written right from birth.”
        </p>
      </div>

      <div>
        {frontImage[1]?.bannerImage ? (
          <img
            src={frontImage[1]?.bannerImage}
            alt=""
            loading="lazy"
            draggable="false"
            className="lg:h-[600px] p-1 object-cover w-full"
          />
        ) : (
          <div className="grid justify-center items-center h-[600px]" >
            <LoadingSpinner />
          </div>
        )}
      </div>
      {/* <HomeVideos/> */}

      <HomeGallary />

      {/* About us section */}
      {/* <div id="about">
        <AboutUs />
      </div> */}

      {/* Contact us */}
      {/* <div id="contact">
        <ContactUs />
      </div> */}
    </div>
  );
}

export default Home;
