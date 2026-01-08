import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// DB
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load env variables
dotenv.config();

// Init app
const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ CORS (FIXED – NO TRAILING SLASH)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local jobseeker
      "http://localhost:5174", // local recruiter
      "https://hireon-jobseeker.netlify.app",
      "https://hireon-recruiter.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ================= DATABASE =================
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("🚀 Job Portal API is running...");
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
