import prisma, { prisma as Prisma } from "../config/database.js";
import config from "../config/config.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { sendEmail } from "../Services/email.server.js";
import { generateSecureOtp, getOtpHtml } from "../Utils/util.js";

const sanitizer = (user) => {
    if (!user) return null;
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        verified: user.verified,
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

        const otp = generateSecureOtp();
        const html = getOtpHtml(otp);
        const otpHash = await bcrypt.hash(otp, 10);

        await Prisma.otp.create({
            data: {
                otphash: otpHash,
                userId: newUser.id,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
            }
        });

        await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html);

        return res.status(201).json({
            message: "User registered successfully. Please verify your email with the OTP sent.",
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

        if (!registeredUser.verified) {
            return res.status(403).json({
                message: "Email not verified. Please verify your email before logging in."
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
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User logged in successfully",
            token,
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

const verifyEmailController = async (req, res) => {
    try {
        const email = req.body?.email || req.query?.email;
        const otp = req.body?.otp || req.query?.otp;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const user = await Prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: "Email is already verified. Please login."
            });
        }

        const latestOtp = await Prisma.otp.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!latestOtp) {
            return res.status(400).json({
                message: "No OTP found. Please request a new verification code."
            });
        }

        const isExpired = latestOtp.expiresAt
            ? new Date() > new Date(latestOtp.expiresAt)
            : (Date.now() - new Date(latestOtp.createdAt).getTime()) > 10 * 60 * 1000;

        if (isExpired) {
            await Prisma.otp.deleteMany({
                where: { userId: user.id }
            });
            return res.status(400).json({
                message: "OTP has expired. Please request a new verification code."
            });
        }

        const isOtpValid = await bcrypt.compare(otp.toString(), latestOtp.otphash);
        if (!isOtpValid) {
            return res.status(400).json({
                message: "Invalid OTP code"
            });
        }

        const verifiedUser = await Prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                verified: true
            }
        });

        await Prisma.otp.deleteMany({
            where: {
                userId: user.id
            }
        });

        const token = JWT.sign(
            { id: verifiedUser.id, username: verifiedUser.username, role: verifiedUser.role },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User verified successfully",
            token,
            user: sanitizer(verifiedUser)
        });
    } catch (error) {
        console.error("Error in verifyEmailController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const resendOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await Prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: "Email is already verified"
            });
        }

        // Delete any existing OTPs
        await Prisma.otp.deleteMany({
            where: { userId: user.id }
        });

        const otp = generateSecureOtp();
        const html = getOtpHtml(otp);
        const otpHash = await bcrypt.hash(otp, 10);

        await Prisma.otp.create({
            data: {
                otphash: otpHash,
                userId: user.id,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        });

        await sendEmail(email, "OTP Verification", `Your new OTP code is ${otp}`, html);

        return res.status(200).json({
            message: "New OTP sent successfully"
        });
    } catch (error) {
        console.error("Error in resendOtpController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is not provided"
            })
        }

        const user = await Prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

        if (!user.verified) {
            return res.status(404).json({
                message: "Email is not verified, Please verify "
            })
        }

        await Prisma.otp.deleteMany({
            where: {
                userId: user.id
            }
        })

        const otp = generateSecureOtp();
        const html = getOtpHtml(otp);
        const otpHash = await bcrypt.hash(otp, 10);

        await Prisma.otp.create({
            data: {
                otphash: otpHash,
                userId: user.id,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
            }
        })

        await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`, html);

        return res.status(200).json({
            message: "Password Reset Otp has been sent"
        })


    } catch (error) {
        console.error("Error in forgotPasswordController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}


const resetPasswordController = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(405).json({
                message: "All credentials required"
            })
        }

        const user = await Prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const latestOtp = await Prisma.otp.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!latestOtp) {
            return res.status(400).json({
                message: "No OTP found. Please request a new verification code."
            });
        }

        const isExpired = latestOtp.expiresAt
            ? new Date() > new Date(latestOtp.expiresAt)
            : (Date.now() - new Date(latestOtp.createdAt).getTime()) > 10 * 60 * 1000;

        if (isExpired) {
            await Prisma.otp.deleteMany({
                where: { userId: user.id }
            });
            return res.status(400).json({
                message: "OTP has expired. Please request a new verification code."
            });
        }

        const isOtpValid = await bcrypt.compare(otp.toString(), latestOtp.otphash);
        if (!isOtpValid) {
            return res.status(400).json({
                message: "Invalid OTP code"
            });
        }

        const hashedpassword = await bcrypt.hash(newPassword, 10);

        await Prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hashedpassword
            }

        })

        await Prisma.otp.deleteMany({
            where: {
                userId: user.id
            }
        })

        return res.status(200).json({
            message: "New Password has been Updated successfully"
        })


    } catch (error) {
        console.error("Error in resetPasswordController: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


}



const authController = {
    registerController,
    loginController,
    logoutController,
    getMeController,
    verifyEmailController,
    resendOtpController,
    forgetPasswordController,
    resetPasswordController
};

export default authController;