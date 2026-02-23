import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full">
      {/* Header with breadcrumb */}
      <div className="mb-8">
        <p className="text-sm text-richblack-300">
          <span className="text-richblack-400">Home</span> / <span className="text-richblack-400">Dashboard</span> / <span className="text-yellow-50">Courses</span>
        </p>
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-3xl font-medium text-richblack-5">My Course</h1>
          <IconBtn
            text="New"
            onClick={() => navigate("/dashboard/add-course")}
            customClasses="px-4 py-2"
          >
            <VscAdd size={16} />
          </IconBtn>
        </div>
      </div>

      {/* Courses Table */}
      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : (
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      )}
    </div>
  )
}