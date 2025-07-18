import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateUserProfile } from "../controllers/userController.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);


export default router;
