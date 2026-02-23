import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import { FiXCircle } from "react-icons/fi"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      about: user?.additionalDetails?.about || "",
    },
  })

  const submitProfileForm = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await dispatch(updateProfile(token, data))
      navigate("/dashboard/my-profile")
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8 mb-10">

      <div className="mt-10 rounded-xl border border-richblack-700 bg-richblack-800 p-8">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>
        <p className="text-sm text-richblack-300 mb-6">
          Update your personal details
        </p>

        <div className="space-y-6">

          {/* Name */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5">
                First Name *
              </label>

              <input
                className="form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("firstName", { required: true, minLength: 2 })}
              />
              {errors.firstName && (
                <p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                  <FiXCircle /> Invalid first name
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5">
                Last Name *
              </label>
              <input
                className="form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("lastName", { required: true, minLength: 2 })}
              />
              {errors.lastName && (
                <p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                  <FiXCircle /> Invalid last name
                </p>
              )}
            </div>
          </div>

          {/* DOB + Gender */}
          <div className="flex flex-col gap-5 lg:flex-row">

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5">
                Date of Birth *
              </label>
              <input
                type="date"
                className="form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("dateOfBirth", { required: true })}
              />
              {errors.dateOfBirth && (
                <p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                  <FiXCircle /> Required
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5 ">
                Gender *
              </label>
              <select
                className="form-style form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("gender", { required: true })}
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              {errors.gender && (
                <p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                  <FiXCircle /> Required
                </p>
              )}
            </div>
          </div>

          {/* Contact + About */}
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5">
                Contact Number *
              </label>
              <input
                className="form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("contactNumber", { required: true })}
              />
              {errors.contactNumber && (
                <p className="flex items-center gap-1 text-sm text-red-400 mt-1">
                  <FiXCircle /> Invalid number
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label className="text-sm font-medium text-richblack-5">
                About *
              </label>
              <textarea
                rows="3"
                className="form-style resize-none form-style rounded-md border border-richblack-600 bg-richblack-700 px-5 py-2 font-medium text-richblack-50 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
                {...register("about", { required: true, maxLength: 200 })}
              />
              <p className="text-xs text-richblack-400 text-right">
                {watch("about")?.length || 0}/200
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md border border-richblack-600 px-5 py-2 text-richblack-200 hover:bg-richblack-700 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 rounded-lg bg-yellow-500 text-richblack-900 font-bold
                     hover:bg-yellow-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </form>
  )
}
