const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Enhancement: Return the promise from mongoose.connect() so the caller
// (server/index.js) can await it and be sure the DB is ready before
// the HTTP server starts accepting requests.  Without this, the server
// could start accepting requests before the DB connection is established,
// leading to confusing "MongoNotConnectedError" failures on the first few requests.
exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((error) => {
            console.error("DB connection failed:", error);
            process.exit(1);
        });
};
