import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

// ✅ FIX: Renamed component from "LoginFrom" to "LoginForm".
// "LoginFrom" was a typo (missing the letter 'r').  While the default export
// means the import name doesn't technically break, the mismatch between the
// internal name and the file name (LoginForm.jsx) causes confusion during
// debugging and breaks React DevTools component labeling.
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
      {/* ─── Email field ─── */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          // ✅ FIX: Changed input type from "text" to "email".
          // type="text" performs no validation — a user could submit "hello"
          // as their email.  type="email" enables the browser's built-in
          // format check (looks for @, domain, etc.) before the form submits.
          type="email"
          required
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          // ✅ FIX: Corrected typo "bg-richbalck-800" → "bg-richblack-800".
          // The misspelled class name was not recognized by Tailwind, so the
          // input had NO background color — it appeared transparent.
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>

      {/* ─── Password field ─── */}
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          {/* ✅ FIX: Corrected typo "text-ping-200" → "text-pink-200".
              The misspelled class meant the required-field asterisk (*) was
              not rendering in the intended pink/red color. */}
          Password <sup className="text-pink-200">*</sup>
        </p>

        {/* ✅ FIX: Restructured the password field into a relative container.
            Previously the <input>, toggle <span>, and "Forgot Password" link
            were all siblings inside the <label>.  The toggle span had class
            "absoulute" (typo for "absolute") and was not inside a positioned
            parent, so it could never overlay the input correctly.
            Now: a wrapper <div className="relative"> contains the input and
            the toggle span (with "absolute"), making the eye icon properly
            positioned at the right edge of the input. */}
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            // ✅ Same bg-richblack typo fix + added pr-10 so text doesn't
            // overlap the eye-icon toggle on the right.
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            // ✅ FIX: Changed "absoulute" (typo) to "absolute" and positioned
            // the icon vertically centered inside the input.
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </div>

        {/* Forgot password link — sits below the input */}
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:text-blue-50 transition-colors duration-200">
            Forgot Password
          </p>
        </Link>
      </label>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
