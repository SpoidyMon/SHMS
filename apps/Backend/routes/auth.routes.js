import express from "express";
import authController from "../controller/auth.controller.js";

const authrouter=express.Router()

authrouter.post("/register",authController.registerController)
authrouter.post("/login",authController.loginController)
authrouter.get("/logout",authController.logoutController)
authrouter.post("/getme",authController.getMeController)


export default authrouter;