import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

// ✅ FIX: Removed unused import of HomePageExplore.
// It was imported but never referenced anywhere in this component.
// Dead imports add to bundle size and create confusion about what
// data the component actually depends on.

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  // These headings get a special white-card style to visually distinguish
  // the "featured" card in each tab group (first card in the row).
  const specialStyleCourses = [
    "Learn HTML",
    "Programming Fundamentals",
    "Python for Beginners",
    "Frontend Developer Path",
    "Software Engineer",
  ];

  const hasSpecialStyle = specialStyleCourses.includes(cardData?.heading);

  return (
    <div
      className={`w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer transition-all duration-200 p-6
        ${
          hasSpecialStyle
            ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 border border-gray-200"
            : currentCard === cardData?.heading
            ? "bg-richblack-700 shadow-lg"
            : "bg-richblack-800 hover:bg-richblack-700"
        }`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Heading */}
      <div
        className={`font-semibold text-[20px] mb-3 ${
          hasSpecialStyle ? "text-richblack-800" : "text-richblack-5"
        }`}
      >
        {cardData?.heading}
      </div>

      {/* Description — clamped to 3 lines */}
      <div
        className={`mb-6 line-clamp-3 h-[72px] ${
          hasSpecialStyle ? "text-richblack-500" : "text-richblack-200"
        }`}
      >
        {cardData?.description}
      </div>

      {/* Level + Lessons footer */}
      <div
        className={`flex justify-between items-center mt-28 pt-4 border-t text-sm gap-3 ${
          hasSpecialStyle
            ? "border-gray-200 text-richblack-700"
            : "border-richblack-600 text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <HiUsers
            className={`${
              hasSpecialStyle ? "text-richblack-600" : "text-richblack-300"
            } text-xl`}
          />
          <p
            className={`font-medium ${
              hasSpecialStyle ? "text-richblack-700" : "text-richblack-100"
            }`}
          >
            {cardData?.level}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ImTree
            className={`${
              hasSpecialStyle ? "text-richblack-600" : "text-richblack-300"
            } text-xl`}
          />
          <p
            className={`font-medium ${
              hasSpecialStyle ? "text-richblack-700" : "text-richblack-100"
            }`}
          >
            {cardData?.lessonNumber} Lessons
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
