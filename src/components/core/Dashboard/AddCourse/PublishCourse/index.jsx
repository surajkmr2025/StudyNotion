import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm()
    const dispatch = useDispatch()
    const courseState = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // If no course data exists (e.g. user navigated here directly), send back to step 1
        if (!courseState.course || !courseState.course._id) {
            toast.error("Please complete the course information first.")
            dispatch(setStep(1))
            return
        }

        // Pre-check the checkbox if the course is already published
        if (courseState.course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [courseState.course, dispatch, setValue])

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses')
    }

    const handleCoursePublish = async () => {
        // ✅ REMOVED: All debug console.log statements that printed course ID,
        // publish status, and checkbox state on every click.

        if (!courseState.course || !courseState.course._id) {
            toast.error("Course data is not available. Please start from the beginning.")
            dispatch(setStep(1))
            return
        }

        const currentStatus = courseState.course.status
        const isPublicChecked = getValues("public")

        // If the status hasn't actually changed, skip the API call
        if (
            (currentStatus === COURSE_STATUS.PUBLISHED && isPublicChecked === true) ||
            (currentStatus === COURSE_STATUS.DRAFT && isPublicChecked === false)
        ) {
            goToCourses()
            return
        }

        const formData = new FormData()
        formData.append("courseId", courseState.course._id)
        formData.append(
            "status",
            isPublicChecked ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        )

        setLoading(true)
        try {
            const result = await editCourseDetails(formData, token)
            if (result) {
                goToCourses()
            }
        } catch (error) {
            // editCourseDetails already shows a toast on failure
            console.error("PublishCourse error:", error)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = () => {
        handleCoursePublish()
    }

    // Show a loading placeholder while course data is being set up
    if (!courseState.course || !courseState.course._id) {
        return (
            <div className="rounded-md border border-richblack-700 bg-richblack-800 p-8 text-center">
                <p className="text-richblack-300">Loading course data...</p>
            </div>
        )
    }

    return (
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-8">
            <h2 className="mb-6 text-2xl font-medium text-richblack-5">Publish Course</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Visibility toggle */}
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="mt-1 h-4 w-4 cursor-pointer rounded accent-yellow-50"
                    />
                    <label htmlFor="public" className="cursor-pointer text-richblack-100">
                        <p className="font-medium text-richblack-5">Make this Course Public</p>
                        <p className="mt-1 text-sm text-richblack-300">
                            When enabled, your course will be visible to all students in the catalog.
                            Uncheck to keep it as a Draft.
                        </p>
                    </label>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-end gap-x-3">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => dispatch(setStep(2))}
                        className="flex cursor-pointer items-center rounded-md bg-richblack-600 px-5 py-2 text-sm font-medium text-richblack-5 hover:bg-richblack-500 transition-all disabled:opacity-50"
                    >
                        Back
                    </button>
                    <IconBtn
                        disabled={loading}
                        text={loading ? "Saving..." : "Save Changes"}
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default PublishCourse
