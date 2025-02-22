import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error("MONGODB_URI is missing from .env.local");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Failed to connect:", err);
        process.exit(1);
    });
