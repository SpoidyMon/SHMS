import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/config.js";
import authrouter from "./routes/auth.routes.js";
import adminRouter from "./routes/Admin.routes.js";
import menuRouter from "./routes/Menu.routes.js"

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
app.use("/api/admin",adminRouter);
app.use("/api/Menu",menuRouter);

export default app;