/**
 * Calculate total duration of a course from its sections and subsections
 * @param {Object} course - Course object with courseContent array
 * @returns {string} - Formatted duration string (e.g., "2hr 30min", "45min", "1hr 15min")
 */
export const calculateCourseDuration = (course) => {
  if (!course || !course.courseContent || course.courseContent.length === 0) {
    return "0min";
  }

  let totalSeconds = 0;

  // Iterate through all sections
  course.courseContent.forEach((section) => {
    if (section.subSection && section.subSection.length > 0) {
      // Iterate through all subsections in each section
      section.subSection.forEach((subSection) => {
        // If timeDuration exists, add it to total
        if (subSection.timeDuration) {
          // Handle both string and number formats
          const duration = typeof subSection.timeDuration === 'string' 
            ? parseFloat(subSection.timeDuration) 
            : subSection.timeDuration;
          
          if (!isNaN(duration)) {
            totalSeconds += duration;
          }
        }
      });
    }
  });

  // Convert seconds to hours and minutes
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // Format the output
  if (hours > 0 && minutes > 0) {
    return `${hours}hr ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}hr`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return "0min";
  }
};

/**
 * Get total number of lectures in a course
 * @param {Object} course - Course object with courseContent array
 * @returns {number} - Total number of lectures/subsections
 */
export const getTotalLectures = (course) => {
  if (!course || !course.courseContent || course.courseContent.length === 0) {
    return 0;
  }

  return course.courseContent.reduce((total, section) => {
    return total + (section.subSection ? section.subSection.length : 0);
  }, 0);
};
