import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.log("MongoDB URI is missing");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};
