import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/auth.routes.js";
import config from "./config/config.js";
import adminRouter from "./routes/Admin.routes.js";

const app = express();

app.use(
    cors({
        origin: config.CLIENT_URL,
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);
app.use("/api/admin",adminRouter)

export default app;