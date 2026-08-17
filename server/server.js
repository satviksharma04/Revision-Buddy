import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";

const app = express();

// Database
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Revision Buddy API Running ",
    });
});

// Middleware (Always last)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/learning", learningRoutes);

app.use(notFound);
app.use(errorHandler);

//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});