import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("❌ MONGODB_URI not found in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
