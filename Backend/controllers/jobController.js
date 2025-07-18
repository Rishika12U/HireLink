import Job from "../models/jobModel.js";

// POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      createdBy: req.user._id,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Job creation failed", error: err.message });
  }
};

// GET /api/jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

// POST /api/jobs/:id/apply
export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.user.toString() === userId.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }

    let resumePath = null;
    if (job.resumeRequired) {
      if (!req.file) {
        return res.status(400).json({ message: 'Resume is required for this job.' });
      }
      resumePath = `/uploads/${req.file.filename}`;
    }

    job.applicants.push({
      user: userId,
      resume: resumePath,
      status: 'pending',
    });

    await job.save();
    res.status(200).json({ message: 'Applied successfully.' });
  } catch (error) {
    console.error('Error in applyToJob:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/jobs/applied
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ "applicants.user": userId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applied jobs", error: err.message });
  }
};

// GET /api/jobs/my-jobs
export const getMyJobsWithApplicants = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id })
      .populate({
        path: "applicants.user",
        select: "name email location skills",
      });
    res.json(jobs);
  } catch (err) {
    console.error("Failed to fetch employer jobs:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// PUT /api/jobs/:jobId/applicants/:userId/status
export const updateApplicantStatus = async (req, res) => {
  const { jobId, userId } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['accepted', 'rejected', 'pending'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const applicant = job.applicants.find(app => app.user.toString() === userId);
    if (!applicant) return res.status(404).json({ message: "Applicant not found" });

    applicant.status = status;
    await job.save();

    res.json({ message: `Applicant status updated to ${status}` });
  } catch (err) {
    console.error("Status update failed:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/jobs/:jobId/withdraw
export const withdrawApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applicants = job.applicants.filter(
      (a) => a.user.toString() !== userId.toString()
    );

    await job.save();

    res.status(200).json({ message: "Application withdrawn successfully" });
  } catch (err) {
    console.error("Withdraw error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
