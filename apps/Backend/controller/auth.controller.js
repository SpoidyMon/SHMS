import { prisma as Prisma } from "../config/database.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const sanitizer = (user) => {
    if (!user) return null;
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };
};

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        const existingUser = await Prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser = await Prisma.user.create({
            data: {
                username,
                email,
                hashedpassword
            }
        });

        const token = JWT.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: sanitizer(newUser)
        });
    } catch (error) {
        console.error("Error in registerController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const registeredUser = await Prisma.user.findUnique({
            where: { email }
        });

        if (!registeredUser) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, registeredUser.hashedpassword);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = JWT.sign(
            { id: registeredUser.id, username: registeredUser.username, role: registeredUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: sanitizer(registeredUser)
        });
    } catch (error) {
        console.error("Error in loginController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Error in logoutController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getMeController = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                message: "Unauthorized: No authenticated user",
                user: null
            });
        }

        const user = await Prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                user: null
            });
        }

        return res.status(200).json({
            message: "User data fetched successfully",
            user: sanitizer(user)
        });
    } catch (error) {
        console.error("Error in getMeController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const authController = { registerController, loginController, logoutController, getMeController };

export default authController;