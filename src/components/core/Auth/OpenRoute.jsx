import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (token === null) {
        // No active session — render the public page (login, signup, etc.)
        return children;
    }

    // ✅ FIX: Comment was wrong — it said "Changed redirect target from
    // '/dashboard/my-profile' to '/'" but the code still redirected to
    // '/dashboard/my-profile'. Fixed comment to match the actual behavior.
    // Redirecting logged-in users to their profile dashboard is correct: they
    // shouldn't see the login / signup pages once already authenticated.
    return <Navigate to="/dashboard/my-profile" />;
};

export default OpenRoute;
