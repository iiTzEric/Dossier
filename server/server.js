import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

await connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});