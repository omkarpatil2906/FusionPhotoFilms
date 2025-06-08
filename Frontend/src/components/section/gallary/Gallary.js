import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CommonHeading from "../../../common/CommonHeading";
import { getGalleryData } from "../../services/ImagesServices";
import LoadingSpinner from "../../../common/loadingspinner/loadingSpinner";
import { useError } from "../../../context/ErrorContext";
import { motion } from "framer-motion";

function Gallary() {
  const [galleryData, setGalleryData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { setError } = useError();
  const galleryRef = useRef(null);

  // Set up Intersection Observer to handle scroll animations
  const initIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);


    const imageElements = galleryRef?.current?.querySelectorAll('.image-container');
    imageElements?.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  };

  useEffect(() => {
    setSpinner(true);
    getGalleryData()
      .then((res) => {

        let tempData = res?.data || [];
        console.log("Temp Data :", tempData);

        if (tempData.length > 0) {
          const updateData = tempData.map((item) => {
            let customName = item?.name;

            switch (customName) {
              case "Groom":
                customName = "Groom's Portraits";
                break;
              case "Bride":
                customName = "Bride's Portraits";
                break;
              case "Wedding":
                customName = "Wedding Stories";
                break;
              case "Pre-Wedding":
                customName = "Pre-Wedding Magic";
                break;
              case "Haldi":
                customName = "Haldi & Rituals";
                break;
              case "Engagement":
                customName = "Engagement Highlights";
                break;
              case "Mehndi":
                customName = "Mehndi Celebrations";
                break;
              case "Makeup":
                customName = "Getting Ready Vibes";
                break;
              case "Maternity":
                customName = "Maternity Moments";
                break;
              case "Reception":
                customName = "Reception Glimpses";
                break;
              case "Baby":
                customName = "Baby Shoot Moments";
                break;
              default:
                customName = item?.name || "Gallery";
            }

            return {
              ...item,
              name: customName,
            };
          });

          setGalleryData(updateData);
          setSpinner(false);
        }


        setTimeout(() => {
          initIntersectionObserver();
        }, 300);
      })
      .catch((error) => {
        setError("Failed to fetch images. Please try again later.");
      });

    return () => {
      const observer = new IntersectionObserver(() => { }, {});
      observer.disconnect();
    };
  }, []);

  return (
    <div className="px-2 flex flex-col justify-center items-center pt-20 lg:pt-12 bg-slate-50">
      {CommonHeading("Our Work")}
      <div>
        <style jsx>{`
          .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.5s ease;
          }
          
          .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>

        {spinner && (
          <div className="grid justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        )}
        {galleryData.length > 0 && !spinner ? (
          <div
            ref={galleryRef}
            className="grid gap-2 lg:gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 md:grid-cols-2 justify-center items-center w-full p-2"
          >
            {galleryData.map((item, i) => (
              <Link to={item.path} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative overflow-hidden border-4 border-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-[400px] object-cover group-hover:brightness-75 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black/45 backdrop-blur-md rounded-t-md">
                    <h2 className="text-[10px] font-semibold lg:text-lg  tracking-wide uppercase text-white font-raleway  text-center">
                      {item.name}
                    </h2>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Gallary;