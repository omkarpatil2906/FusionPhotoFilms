import React, { useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { GroomImg } from "../../../services/ImagesServices";
import LoadingSpinner from "../../../../common/loadingspinner/loadingSpinner";
import CommonHeading from "../../../../common/CommonHeading";
import { Link } from "react-router-dom";
import { useError } from "../../../../context/ErrorContext";
import ScrollToTop from "../../../../common/ScrollToTop";

function Groom() {
  const [groomImage, setGroomImage] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { setError } = useError();
  const galleryRef = useRef(null);

  const getImages = () => {
    setSpinner(true);
    GroomImg()
      .then((response) => {
        const images = response.data;

        const categorizeImages = (images) => {
          const largeImages = [];
          const smallImages = [];

          images.forEach((image) => {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
              if (img.height > img.width) {
                largeImages.push(image);
              } else {
                smallImages.push(image);
              }
            };
          });

          return new Promise((resolve) => {
            const interval = setInterval(() => {
              if (largeImages.length + smallImages.length === images.length) {
                clearInterval(interval);
                resolve({ largeImages, smallImages });
              }
            }, 100);
          });
        };

        categorizeImages(images)
          .then(({ largeImages, smallImages }) => {
            console.log("Large images count:", largeImages.length);
            console.log("Small images count:", smallImages.length);

            const arrangedImages = [];
            for (
              let i = 0;
              i <
              Math.min(largeImages.length, Math.floor(smallImages.length / 2));
              i++
            ) {
              arrangedImages.push(largeImages[i]);
              arrangedImages.push(smallImages[i * 2]);
              arrangedImages.push(smallImages[i * 2 + 1]);
            }
            if (largeImages.length > Math.floor(smallImages.length / 2)) {
              arrangedImages.push(
                ...largeImages.slice(Math.floor(smallImages.length / 2))
              );
            }

            if (smallImages.length > largeImages.length * 2) {
              arrangedImages.push(...smallImages.slice(largeImages.length * 2));
            }

            console.log("Total arranged images:", arrangedImages.length); // Debugging
            setGroomImage(arrangedImages);
            setSpinner(false);
            setTimeout(() => {
              initIntersectionObserver();
            }, 300);
          })
          .catch((error) => console.error("Error categorizing images:", error));
      })
      .catch((error) => {
        setError("Failed to fetch images. Please try again later.");
      });
  };

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

    // Get all image containers
    const imageElements = galleryRef?.current?.querySelectorAll('.image-container');
    imageElements?.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  };

  useEffect(() => {
    getImages();

    // Cleanup function
    return () => {
      const observer = new IntersectionObserver(() => { }, {});
      observer.disconnect();
    };
  }, []);


  return (
    <div className="px-2 flex flex-col justify-centerpt-20 lg:pt-12 items-center bg-slate-50">
         <ScrollToTop />

      {CommonHeading("Groom's Portraits")}

      {spinner && (
        <div className="grid justify-center items-center h-96">
          <LoadingSpinner />
        </div>
      )}

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

      {groomImage.length > 0 && !spinner ? (
        <div ref={galleryRef}>
          <LightGallery
            speed={500}
            elementClassNames="columns-2 sm:columns-2 lg:columns-3 xl:columns-5 gap-2 [&>a]:mb-1 [&>a]:inline-block [&>a]:w-full"
            plugins={[lgThumbnail]}
            download={false}
            mobileSettings={{
              controls: true,
              showCloseIcon: true,
            }}
            onInit={() => console.log("LightGallery has been initialized")}
            mode="lg-fade"
          >
            {groomImage.map((image, index) => (
              <a key={index} href={image.src} className="relative block  group  image-container">
                <div className="overflow-hidden">
                  <img
                    src={image.src}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-150"
                    alt="Fusion Film"
                  />
                </div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="absolute inset-0 flex items-end justify-center">
                    <h2
                      className="font-montserrat text-[9px]  p-2 font-bold uppercase text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {image.name}
                    </h2>
                  </div>
                </div>
              </a>
            ))}
          </LightGallery>
        </div>
      ) : (
        <>
          {!spinner && (
            <div className="flex justify-center h-96 items-center font-semibold">
              No Record Found <span className="animate-pulse">...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Groom;
