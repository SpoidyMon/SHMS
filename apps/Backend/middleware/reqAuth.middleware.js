import JWT from "jsonwebtoken";
import config from "../config/config.js";
import { prisma as Prisma } from "../config/database.js";

const reqAuth = async (req, res, next) => {
    try {
        const cookieToken = req.cookies?.token;
        const authHeader = req.headers.authorization || req.headers.authorisation;

        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        const token = cookieToken || bearerToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = JWT.verify(token, config.JWT_SECRET);

        const user = await Prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                status: true,
                isActive: true,
                deletedAt: true,
                tokenVersion: true,
            }
        });

        if (!user || user.status === "DISABLED" || !user.isActive || user.deletedAt) {
            return res.status(401).json({
                success: false,
                message: "User account is disabled or no longer exists"
            });
        }

        if (decoded.tokenVersion === undefined || decoded.tokenVersion !== user.tokenVersion) {
            return res.status(401).json({
                success: false,
                message: "Session expired or invalidated. Please log in again."
            });
        }

        req.user = user;
        next();

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}
export default reqAuth;