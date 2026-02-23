import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'
const LearningLanguageSection = () => {
    return (
        <div className='mt-[150px] mb-10'>
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-7 justify-between items-center'>
                <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife for
                    <HighlightText text={" learning any language"} />
                </div>
                <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[50%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                {/* image */}
                <div className='flex items-center justify-center'>
                    {/* first image */}
                    <div className='flex flex-row items-center justify-center mt-5'>
                        <img src={know_your_progress} alt="KnowYourProgressImage" className='object-contain -mr-40 z-10 scale-x-[145%] scale-y-[150%]' />
                    </div>
                    {/* second image */}
                    <div className='flex flex-row items-center justify-center mt-5'>
                        <img src={compare_with_others} alt="CompareWithOthersImage" className='object-contain z-20 scale-y-[90%] scale-x-[90%]' />
                    </div>
                    {/* third image */}
                    <div className='flex flex-row items-center justify-center mt-5'>
                        <img src={plan_your_lesson} alt="PlanYourLessonImage" className='object-contain -ml-52 z-20 scale-[145%] scale-y-[170%]' />
                    </div>
                </div>

                {/* Button */}
                <div className='w-fit h-fit mb-24'>
                    <CTAButton active={true} linkto={'/signup'}>
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection
