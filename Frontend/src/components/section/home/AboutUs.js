import React from 'react'
import surajP from '../../../common/asset/SurajP.jpg'
function AboutUs() {
    return (
        <div className=' flex flex-col   xl:pt-2 pt-14 lg:justify-evenly items-center w-full bg-white  xl:my-12 '>

            <h2 className="text-2xl md:text-4xl py-4 font-belleza-regular uppercase tracking-widest font-bold text-customColor">
                Behind the Lens
            </h2>
            <div className='p-5 flex flex-col lg:flex-row items-center w-full justify-between xl:w-[70%]'>
                <div className='lg:w-[60%]'>
                    <img src={surajP} className='h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] ' style={{ objectFit: 'cover', objectPosition: 'bottom' }} alt="" loading='lazy' />
                </div>
                <div className=' lg:w-[40%] space-y-1'>
                    <div className='p-2'>
                        <h2 className='font-belleza-regular tracking-widest text-center font-bold text-2xl uppercase'>Suraj Patil</h2>
                        <h3 className='tracking-widest text-center font-montserrat text-sm'>Founder</h3>
                        <p className='mt-4 font-belleza-regular text-center '>A photographer captures moments without having the subject pose, focusing on natural expressions and spontaneous actions, regardless of whether the subject is aware of the photo being taken or has given permission for its use or distribution. The essential element is the absence of deliberate posing.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs