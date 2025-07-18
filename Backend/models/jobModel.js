// models/jobModel.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resumeRequired: {
  type: Boolean,
  default: false,
},

  applicants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      appliedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
      },
       resume: { type: String },
    },
  ],

}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
