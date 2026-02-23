import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div className="text-richblack-100 text-lg leading-relaxed text-center max-w-3xl mx-auto px-4">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighlightText text={"combines technology"} />
      <span className="text-brown-500">
        {" "}
        {/* ✅ FIX: Corrected typo "experties" → "expertise". */}
        expertise
      </span>
      , and community to create an
      <span className="text-brown-500"> unparalleled educational experience.</span>
    </div>
  );
};

export default Quote;
