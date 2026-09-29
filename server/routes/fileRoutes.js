import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUploadUrl } from "../controllers/fileController.js";

const router = express.Router()

router.post("/upload-url", protectRoute, getUploadUrl)

export default router;