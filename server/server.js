import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import folderRoutes from "./routes/folderRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());  
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes)
app.use("/api/files", fileRoutes)

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
});

await connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});