import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
        {" "}
        {text}
    </span>
  )
}

export default HighlightText
