import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";


// DB Connection
import connectDB from "./config/db.js";



// Routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js"

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
connectDB();


// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);



// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Job Portal API is running...");
});

// ================= ERROR HANDLER (optional) =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
