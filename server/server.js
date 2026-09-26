import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});