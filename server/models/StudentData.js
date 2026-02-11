const mongoose = require("mongoose");

/* ================= GOAL SCHEMA ================= */
const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, default: "" },
  progress: { type: Number, default: 0 },
  current: { type: Number, default: 0 },
  target: { type: Number, default: 100 },
  due: { type: String, default: "" }
});

/* ================= COURSE SCHEMA ================= */
const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  credits: Number,
  marks: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 }
});

/* ================= STUDENT DATA ================= */
const studentDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    cgpa: { type: Number, default: 0 },
    attendance: { type: Number, default: 0 },
    semester: { type: Number, default: 1 },

    courses: {
      type: [courseSchema],
      default: []
    },

    goals: {
      type: [goalSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentData", studentDataSchema);
