import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://hirelink-ma6j.onrender.com',
];

const corsOptions = {
  origin: [
    'http://localhost:5173',                  // development
    'https://hirelink-ma6j.onrender.com'      // deployed frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use("/api/jobs", jobRoutes);
// app.use('/uploads', express.static('uploads'));


// MongoDB connect and server start
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => console.error('MongoDB connection failed:', err));
