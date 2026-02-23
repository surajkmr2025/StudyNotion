import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operations/studentFeatureAPI'

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user, navigate, dispatch)

    }

    return (
        <div className="w-full min-w-full rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sm:min-w-[280px] sm:max-w-[400px] lg:sticky lg:top-10 lg:max-w-[300px]">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

            {/* ✅ FIX: Was `onclick` (all lowercase) — not a valid React event prop.
                React uses camelCase synthetic events, so it must be `onClick`.
                The lowercase version was silently ignored, making the Buy Now
                button do absolutely nothing when clicked. */}
            <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}
                customClasses="w-full justify-center"
            />
        </div>
    )
}

export default RenderTotalAmount
