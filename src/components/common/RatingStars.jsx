import React, { useEffect, useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const RatingStars = ({ Review_Count, Star_Size }) => {
    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    })

    useEffect(() => {
        const wholeStars = Math.floor(Review_Count) || 0
        setStarCount({
            full: wholeStars,
            half: Number.isInteger(Review_Count) ? 0 : 1,
            empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
        })
    }, [Review_Count])

    return (
        <div className='flex gap-1 text-yellow-100'>
            {[...new Array(starCount.full)].map((_, i) => (
                <FaStar key={i} size={Star_Size || 20} />
            ))}
            {[...new Array(starCount.half)].map((_, i) => (
                <FaStarHalfAlt key={i} size={Star_Size || 20} />
            ))}
            {[...new Array(starCount.empty)].map((_, i) => (
                <FaRegStar key={i} size={Star_Size || 20} />
            ))}
        </div>
    )
}

export default RatingStars
