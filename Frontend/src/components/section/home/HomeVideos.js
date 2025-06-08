import React, { useRef, useEffect } from 'react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// import homeVideo from '../../../common/asset/komal.mp4';

function HomeVideos() {
    const containerRef = useRef(null);


    return (
        <div>

            {/* <video src={homeVideo}></video> */}

            <div className='p-1'>
                <video
                    autoPlay
                    // muted
                    loop
                    className=" w-full h-[540px] object-cover"
                >
                    {/* <source src={homeVideo} type="video/mp4" /> */}
                </video>

            </div>

            {/* <div ref={containerRef}>
                <LightGallery
                    dynamic
                    dynamicEl={[]}
                    plugins={[lgThumbnail, lgVideo]}
                    closable={false}
                    showMaximizeIcon={true}
                    slideDelay={400}
                    thumbWidth={130}
                    thumbHeight={'100px'}
                    thumbMargin={6}
                    appendSubHtmlTo={'.lg-item'}
                />
            </div> */}
        </div>
    );
}

export default HomeVideos;
