import React, { useEffect, useState, useRef } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { FrontPageImg } from '../../services/ImagesServices';
import { useError } from '../../../context/ErrorContext';

function HomeGallery() {
  const [frontImage, setFrontImage] = useState([]);
  const { setError } = useError();
  const galleryRef = useRef(null);

  const getImages = () => {
    FrontPageImg()
      .then(response => {
        const images = response.data;

        const categorizeImages = (images) => {
          const largeImages = [];
          const smallImages = [];

          images.forEach(image => {
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

          return new Promise(resolve => {
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
            for (let i = 0; i < Math.min(largeImages.length, Math.floor(smallImages.length / 2)); i++) {
              arrangedImages.push(largeImages[i]);
              arrangedImages.push(smallImages[i * 2]);
              arrangedImages.push(smallImages[i * 2 + 1]);
            }
            if (largeImages.length > Math.floor(smallImages.length / 2)) {
              arrangedImages.push(...largeImages.slice(Math.floor(smallImages.length / 2)));
            }

            if (smallImages.length > largeImages.length * 2) {
              arrangedImages.push(...smallImages.slice(largeImages.length * 2));
            }

            console.log("Total arranged images:", arrangedImages.length);
            setFrontImage(arrangedImages);
            
            // Initialize the Intersection Observer after images are loaded
            setTimeout(() => {
              initIntersectionObserver();
            }, 300);
          })
          .catch(error => console.error('Error categorizing images:', error));
      })
      .catch((error) => {
        setError('Failed to fetch images. Please try again later.');
      });
  };

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
      const observer = new IntersectionObserver(() => {}, {});
      observer.disconnect();
    };
  }, []);

  return (
    <div className="p-1 lg:p-1 bg-[#F7F9F2]">
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
          onInit={() => console.log('LightGallery has been initialized')}
          mode="lg-fade"
        >
          {frontImage.map((image, index) => (
            <a
              key={index}
              href={image.src}
              className="relative block group image-container"
            >
              <div className="overflow-hidden">
                <img
                  src={image.src}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-150"
                  alt={"Fusion Films"}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2
                    className="font-montserrat text-[9px] p-2 font-bold uppercase text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
    </div>
  );
}

export default HomeGallery;