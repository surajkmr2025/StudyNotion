import RenderSteps from './RenderSteps'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export default function AddCourse() {
    const navigate = useNavigate()

    return (
        <div className='w-full'>
            {/* Back to Dashboard Link */}
            <button 
                onClick={() => navigate('/dashboard/my-courses')}
                className='flex items-center gap-2 text-sm text-richblack-300 hover:text-richblack-5 transition-colors mb-6'
            >
                <IoMdArrowBack size={16} />
                <span>Back to Dashboard</span>
            </button>

            <div className='flex w-full items-start gap-x-6'>
                {/* Main Content */}
                <div className='flex flex-1 flex-col'>
                    <div className='flex-1'>
                        <RenderSteps />
                    </div>
                </div>

                {/* Course Upload Tips */}
                <div className='sticky top-10 hidden max-w-[400px] flex-1 rounded-md border border-richblack-700 bg-richblack-800 p-6 xl:block'>
                    <p className='mb-6 flex items-center gap-2 text-base font-semibold text-richblack-5'>
                        <span className='text-yellow-50'>⚡</span> Course Upload Tips
                    </p>
                    <ul className='ml-5 list-disc space-y-3 text-xs text-richblack-5 marker:text-richblack-300'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024×576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
