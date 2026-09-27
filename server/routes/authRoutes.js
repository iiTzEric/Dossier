import express from "express"
import { getMe, login, register } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleare.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", login)
router.get("/me", protectRoute, getMe)

export default router;