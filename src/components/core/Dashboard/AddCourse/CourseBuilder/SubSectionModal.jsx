import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross1 } from 'react-icons/rx'
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn'
import toast from 'react-hot-toast'

// ✅ FIX: This modal was completely unstyled — every element was a bare <div>
// with no Tailwind classes.  The modal appeared as plain stacked text with
// no background, no border, and no layout. Full Tailwind styling has been added
// to match the rest of the Dashboard design system.

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    // Pre-fill form when viewing or editing an existing lecture
    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureDuration", modalData.timeDuration)
            setValue("lectureVideo", modalData.videoUrl)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Returns true if any field differs from the saved lecture data
    const isFormUpdated = () => {
        const currentValues = getValues()
        // ✅ FIX: Changed `!=` to `!==` throughout.
        // The loose inequality operator (`!=`) performs type coercion which can
        // produce unexpected results (e.g. "5" != 5 → false).  Strict
        // inequality (`!==`) always compares both value AND type — the correct
        // approach for comparing form strings to database values.
        return (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureDuration !== modalData.timeDuration ||
            currentValues.lectureVideo !== modalData.videoUrl
        )
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if (currentValues.lectureTitle !== modalData.title)
            formData.append("title", currentValues.lectureTitle)
        if (currentValues.lectureDesc !== modalData.description)
            formData.append("description", currentValues.lectureDesc)
        if (currentValues.lectureDuration !== modalData.timeDuration)
            formData.append("timeDuration", currentValues.lectureDuration)
        if (currentValues.lectureVideo !== modalData.videoUrl)
            formData.append("video", currentValues.lectureVideo)

        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
            // Update only the modified section in the local course state
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            )
            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
        }
        setModalData(null)
        setLoading(false)
    }

    const onSubmit = async (data) => {
        if (view) return // view-only mode — no submission

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form")
                return
            }
            handleEditSubSection()
            return
        }

        // ─── ADD new lecture ────────────────────────────────────────────────
        if (!data.lectureVideo) {
            toast.error("Please upload a video")
            return
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("timeDuration", data.lectureDuration)
        formData.append("videoFile", data.lectureVideo)

        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
        }
        setModalData(null)
        setLoading(false)
    }

    const modalTitle = view ? "Viewing" : add ? "Adding" : "Editing"

    return (
        // Backdrop — clicking outside the modal card closes it (unless uploading)
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-richblack-900/70 backdrop-blur-sm"
            onClick={() => !loading && setModalData(null)}
        >
            {/* Modal card — stop click propagation so clicks inside don't close it */}
            <div
                className="relative w-11/12 max-w-[680px] max-h-[90vh] overflow-y-auto rounded-xl border border-richblack-600 bg-richblack-800 p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-xl font-semibold text-richblack-5">
                        {modalTitle} Lecture
                    </p>
                    <button
                        onClick={() => !loading && setModalData(null)}
                        disabled={loading}
                        className="rounded-full p-1 text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5 transition-all disabled:cursor-not-allowed"
                        aria-label="Close modal"
                    >
                        <RxCross1 size={20} />
                    </button>
                </div>

                {/* ── Form ────────────────────────────────────────────────── */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Video upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
                            Lecture Title <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            type="text"
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            disabled={view}
                            {...register("lectureTitle", { required: true })}
                            className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none transition-all disabled:opacity-60"
                        />
                        {errors.lectureTitle && (
                            <span className="text-xs text-pink-200">Lecture title is required</span>
                        )}
                    </div>

                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
                            Lecture Description <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            disabled={view}
                            {...register("lectureDesc", { required: true })}
                            className="min-h-[120px] w-full resize-none rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none transition-all disabled:opacity-60"
                        />
                        {errors.lectureDesc && (
                            <span className="text-xs text-pink-200">Lecture description is required</span>
                        )}
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureDuration" className="text-sm text-richblack-5">
                            Duration (seconds) <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            type="number"
                            id="lectureDuration"
                            min="0"
                            placeholder="e.g. 300 for 5 minutes"
                            disabled={view}
                            {...register("lectureDuration", { required: true, min: 0 })}
                            className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-5 placeholder-richblack-400 focus:border-yellow-50 focus:outline-none transition-all disabled:opacity-60"
                        />
                        {errors.lectureDuration && (
                            <span className="text-xs text-pink-200">Lecture duration is required</span>
                        )}
                    </div>

                    {/* Submit button — hidden in view-only mode */}
                    {!view && (
                        <div className="flex justify-end">
                            <IconBtn
                                disabled={loading}
                                text={loading ? "Saving..." : edit ? "Save Changes" : "Save"}
                                type="submit"
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
