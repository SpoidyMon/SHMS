import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/auth.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:3000"],
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);

export default app;