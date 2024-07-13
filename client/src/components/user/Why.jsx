import React from 'react'

const Why = () => {
  return (
    <div className='w-full text-white bg-green-900 flex flex-col justify-center items-center p-10'>
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
