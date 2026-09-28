import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createFolder, getFolders } from "../controllers/folderController.js";

const router = express.Router();

router.post("/", protectRoute, createFolder)
router.get("/", protectRoute, getFolders)

export default router;