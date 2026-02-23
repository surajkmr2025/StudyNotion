import React from 'react'
import { Link } from 'react-router-dom'
const CTAButton = ({children, active, linkto}) => {
  
  return (
    <Link to={linkto}>
        <div className={`w-full text-center text-sm md:text-base px-6 py-3 rounded-md font-semibold
      ${active ? "bg-yellow-400 text-black" : "bg-richblack-800 text-richblack-200"}
      hover:scale-95 hover:shadow-lg transition-all duration-200 ease-in-out
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton
