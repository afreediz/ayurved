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
      <h1 className=' pb-6'>Why NAVJEEVANA</h1>
      <div className="items flex justify-center gap-16 lg:gap-60 flex-wrap">
        <div className="item text-center">
            <img src="/images/why/fresh.webp" alt="" />
            <span>organic</span>
        </div>
        <div className="item text-center">
            <img src="/images/why/noflavor.webp" alt="" />
            <span>organic</span>
        </div>
        <div className="item text-center">
            <img src="/images/why/positive.webp" alt="" />
            <span>organic</span>
        </div>
        <div className="item text-center">
            <img src="/images/why/small.webp" alt="" />
            <span>organic</span>
        </div>
        <div className="item text-center">
            <img src="/images/why/tradition.webp" alt="" />
            <span>organic</span>
        </div>
      </div>
    </div>
  )
}

export default Why
