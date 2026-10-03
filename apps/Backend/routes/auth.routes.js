import express from "express";
import authController from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authrouter = express.Router();

authrouter.post("/register", authController.registerController);
authrouter.post("/login", authController.loginController);
authrouter.post("/logout", authController.logoutController);

authrouter.get("/getme", authenticate, authController.getMeController);
authrouter.post("/verify-email", authController.verifyEmailController);

authrouter.post("/resend-otp", authController.resendOtpController);

export default authrouter;