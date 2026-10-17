import JWT from "jsonwebtoken"
import config from "../config/config"
import { prisma as Prisma } from "../config/database"

const reqAuth = async (req, res, next) => {
    try {
        const cookieToken = req.cookie?.token
        const authHeader = req.headers.authorisation

        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

        const token = cookieToken || bearerToken
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Authentication required"
            })
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
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User no longer exist"
            })
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