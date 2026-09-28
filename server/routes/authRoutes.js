import express from "express"
import { getMe, googleAuth, login, register } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login)
router.post("/google", googleAuth)
router.get("/me", protectRoute, getMe)

export default router;