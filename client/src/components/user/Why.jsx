import React from 'react'

const Why = () => {
  return (
    <div
  style={{
    backgroundImage: "url('/images/why/bg.jpeg')",
    backgroundSize: "cover", // Ensure the entire image fits within the div
    backgroundPosition: "center", // Center the image,
    backgroundRepeat: "no-repeat",
    width: "100%", // Ensure the div takes full width
    height: "auto" // Let height adjust based on content or use a fixed height,
  }}
  className="w-full text-white flex flex-col justify-center items-center p-10 my-10 relative z-[-1]"
>
<div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>
      <h1 className=' pb-6'>WHY NAVJEEVANA</h1>
      <div className="items flex justify-center gap-16 lg:gap-60 flex-wrap">
        <div data-aos="zoom-in-right" className="flex flex-col justify-center items-center gap-2">
            <img src="/images/why/fresh_new.png" className=' max-w-24 rounded-full' alt="" />
            <span className='text-xl font-bold'>Farm fresh</span>
        </div>
        <div data-aos="zoom-in-left" className="flex flex-col justify-center items-center gap-2">
            <img src="/images/why/nochemicals_new.png" className=' max-w-24 rounded-full' alt="" />
            <span className='text-xl font-bold'>No flavor</span>
        </div>
        <div data-aos="zoom-in" className="flex flex-col justify-center items-center gap-2">
            <img src="/images/why/number1_new.png" className=' max-w-24 rounded-full' alt="" />
            <span className='text-xl font-bold'>Number 1 Ghee in the world</span>
        </div>
        <div data-aos="zoom-in-right" className="flex flex-col justify-center items-center gap-2">
            <img src="/images/why/packed_new.png" className=' max-w-24 rounded-full' alt="" />
            <span className='text-xl font-bold'>Well Packed</span>
        </div>
        <div data-aos="zoom-in-left" className="flex flex-col justify-center items-center gap-2">
            <img src="/images/why/handshake_new.png" className=' max-w-24 rounded-full' alt="" />
            <span className='text-xl font-bold'>Honest</span>
        </div>
      </div>
    </div>
  )
}

export default Why
