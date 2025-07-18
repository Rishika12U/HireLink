import express from "express";
import {
  createJob,
  getAllJobs,
  applyToJob,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAppliedJobs } from "../controllers/jobController.js";
import { getMyJobsWithApplicants } from "../controllers/jobController.js";
import { updateApplicantStatus } from "../controllers/jobController.js";
import { deleteJob } from "../controllers/jobController.js";
import { withdrawApplication } from "../controllers/jobController.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.post("/", protect, createJob);           // POST /api/jobs
router.get("/", protect, getAllJobs);           // GET /api/jobs
router.post('/:id/apply', protect, upload.single('resume'), applyToJob);

router.get("/applied", protect, getAppliedJobs);  // Add this line
router.get("/my-jobs", protect, getMyJobsWithApplicants);
router.put("/:jobId/applicants/:userId/status", protect, updateApplicantStatus);
router.delete("/:id", protect, deleteJob);
router.put('/:jobId/withdraw', protect, withdrawApplication);


export default router;
