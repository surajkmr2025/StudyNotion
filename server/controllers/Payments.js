const { instance } = require('../config/razorpay');
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const CourseProgress = require('../models/CourseProgress');

// ============================================================
// CAPTURE PAYMENT — validates courses and creates a Razorpay order
// ============================================================
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide at least one course ID" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        try {
            const course = await Course.findById(course_id);
            if (!course) {
                return res.status(404).json({ success: false, message: `Course not found: ${course_id}` });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message: "You are already enrolled in one of these courses" });
            }

            totalAmount += course.price;
        } catch (error) {
            console.error("capturePayment error:", error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    const options = {
        amount: totalAmount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: Date.now().toString(),
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({ success: true, message: paymentResponse });
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return res.status(500).json({ success: false, message: "Could not initiate order" });
    }
};

// ============================================================
// VERIFY PAYMENT — validates Razorpay signature then enrolls students
// ============================================================
exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Payment verification failed: missing fields" });
    }

    // Razorpay signature = HMAC-SHA256 of "orderId|paymentId" using the webhook secret
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed: invalid signature" });
    }

    try {
        await enrollStudents(courses, userId);
        return res.status(200).json({ success: true, message: "Payment verified" });
    } catch (error) {
        console.error("verifyPayment — enrollment failed:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ============================================================
// enrollStudents — internal helper; throws on failure (does NOT touch res)
// ============================================================
const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Courses and userId are required for enrollment");
    }

    for (const courseId of courses) {
        // Add student to the course's enrolled list
        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) {
            throw new Error(`Course not found during enrollment: ${courseId}`);
        }

        // Create a fresh progress tracker for this course
        const courseProgress = await CourseProgress.create({
            courseID: courseId,
            userId,
            completedVideos: [],
        });

        // Add the course and its progress doc to the student's profile
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId, courseProgress: courseProgress._id } },
            { new: true }
        );

        if (!enrolledStudent) {
            throw new Error(`User not found during enrollment: ${userId}`);
        }

        // Send confirmation email (best-effort — log but don't fail enrollment)
        try {
            await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );
        } catch (mailError) {
            console.error("Enrollment email failed (non-critical):", mailError.message);
        }
    }
};

// ============================================================
// SEND PAYMENT SUCCESS EMAIL
// ============================================================
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const student = await User.findById(userId);
        if (!student) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await mailSender(
            student.email,
            "Payment Received – StudyNotion",
            paymentSuccessEmail(`${student.firstName} ${student.lastName}`, amount / 100, orderId, paymentId)
        );

        return res.status(200).json({ success: true, message: "Payment success email sent" });
    } catch (error) {
        console.error("sendPaymentSuccessEmail error:", error);
        return res.status(500).json({ success: false, message: "Could not send email" });
    }
};
