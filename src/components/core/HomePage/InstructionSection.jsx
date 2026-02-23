import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa6'
const InstructionSection = () => {
  return (
    <div className='mt-10'>        
        <div className='flex flex-row gap-10 items-center '>
            {/* Left  */}
            <div className='w-[50%]'>
                <img src={Instructor} alt="InstructorImage" className='
                    shadow-white
                '/>
            </div>

            {/* right */}
            <div className='w-[50%] flex flex-col pr-10 ml-12 gap-10 '>
                <div className='text-3xl font-semibold'>
                    Become an <br/>
                    <HighlightText text="instructor"/>
                </div>
                <div className='font-medium text-[16px] w-[81%] text-richblack-500'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 text-sm items-center'>
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructionSection
