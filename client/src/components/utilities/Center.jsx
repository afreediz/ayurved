import React from 'react'

const Center = ({children, ...rest}) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${rest["className"]}`}>
        <div className="flex flex-col">
            {children}
        </div>
    </div>
  )
}

export default Center
