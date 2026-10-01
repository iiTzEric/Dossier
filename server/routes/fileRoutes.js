import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUploadUrl, confirmUpload } from "../controllers/fileController.js";

const router = express.Router()

router.post("/upload-url", protectRoute, getUploadUrl)
router.post("/confirm", protectRoute, confirmUpload)

export default router;