import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['worker', 'employer'], required: true },
  location: { type: String },
  skills: [String], // for workers
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
