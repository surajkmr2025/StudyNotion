import React from 'react'
import CTAButton from "./Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between`}>
      {/* Section 1 */}
      <div className='w-full lg:w-[50%] flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-300 font-bold '>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
            </CTAButton>
        </div>

      </div>

      {/* Section 2 */}
      {/* Code section 2 */}
        <div className={`relative h-fit flex flex-row text-sm w-full lg:w-[40%] py-4 rounded-xl shadow-lg overflow-hidden ${backgroundGradient}`}>
          {/*HW: bg gradient */}
          <div 
            className='absolute inset-0 z-0 pointer-events-none'
            style={
                {
                    background: `linear-gradient(90deg, rgba(138,43,226,0.2), rgba(255,165,0,0.2), rgba(248,248,255,0.2))`,
                    filter: "blur(68px)",
                    opacity: 0.6,
                }
            }
          />
        <div className='flex w-full'>
          <div className="text-right flex flex-col w-[5%] pr-2 pl-2 text-richblack-400 font-inter font-bold z-10">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          {/* Code block */}
          <div className={`w-[95%] flex flex-col min-h-[264px] font-bold font-mono ${codeColor} pr-2 z-10 text-md`}>
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              style={
                {
                    whiteSpace:"pre-line",
                    display:"block",
                    // lineHeight: 
                }
              }
              omitDeletionAnimation={true}
            />
          </div>
        </div>
        </div>
    </div>
  )
}

export default CodeBlocks
