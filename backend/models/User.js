import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: true,
    },

    // 🔹 Job Seeker Fields
    resume: {
      type: String, // resume file url
    },

    skills: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number, // in years
      default: 0,
    },

    // 🔹 Recruiter Fields
    companyName: {
      type: String,
    },

    companyWebsite: {
      type: String,
    },

    companyLocation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
