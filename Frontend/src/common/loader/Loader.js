import React from 'react'
import { tailspin } from 'ldrs'

function Loader() {
    tailspin.register()
    return (
        <div>
            <div className='h-screen w-screen bg-[#0f6061]  flex justify-center items-center'>
                <l-tailspin
                    size="40"
                    stroke="5"
                    speed="0.9"
                    // color="#1c7e80"
                    color="#fafafa"

                ></l-tailspin>
            </div>

        </div>
    )
}

export default Loader