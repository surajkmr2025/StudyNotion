const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        // ✅ FIX: Was `Date.now()` (called immediately at module-load time).
        // Every OTP document would share the SAME timestamp — the one from when
        // the server started — making the TTL calculation wrong for all subsequent
        // OTPs.  Using the function reference `Date.now` tells Mongoose to call it
        // fresh each time a new document is created.
        default: Date.now,
        expires: 5 * 60, // OTP expires after 5 minutes (MongoDB TTL index)
    },
    otp: {
        type: String,
        required: true,
    },
});

// ─── Pre-save hook: send verification email whenever a new OTP is stored ───
// NOTE: This hook is the ONLY place where the OTP email should be sent.
// The Auth.js controller previously also tried to send the email, which caused
// every user to receive TWO identical OTP emails. The controller call has been
// removed — this hook is the single source of truth for OTP delivery.
OTPSchema.pre("save", async function (next) {
    // Only send email on NEW documents (not on updates to existing OTP records)
    if (this.isNew) {
        try {
            await mailSender(
                this.email,
                "StudyNotion – Your OTP Verification Code",
                otpTemplate(this.otp)
            );
        } catch (mailErr) {
            // Log but do NOT block the save — the OTP is still stored in DB.
            // The user can request a resend if the email didn't arrive.
            console.error("OTP email delivery failed:", mailErr.message);
        }
    }
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
