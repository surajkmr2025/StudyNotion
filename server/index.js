const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const os = require("os");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

// Load .env variables before anything else references process.env
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean); // removes undefined/empty values

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow server-to-server requests (no origin) and listed origins
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS blocked for origin: ${origin}`));
            }
        },
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        // os.tmpdir() is cross-platform (works on Windows, Mac, Linux)
        tempFileDir: os.tmpdir(),
    })
);

// ─── Cloudinary ─────────────────────────────────────────────────────
try {
    cloudinaryConnect();
} catch (err) {
    console.warn("Cloudinary initialization failed:", err?.message || err);
}

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

// Health-check route
app.get("/", (req, res) => {
    res.json({ success: true, message: "Server is running" });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});

// ─── Startup ─────────────────────────────────────────────────────────────────

const start = async () => {
    try {
        await database.connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

start();
