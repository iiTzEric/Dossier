import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUploadUrl, confirmUpload, getFiles } from "../controllers/fileController.js";

const router = express.Router()

router.post("/upload-url", protectRoute, getUploadUrl)
router.post("/confirm", protectRoute, confirmUpload)
router.get("/", protectRoute, getFiles);

export default router;