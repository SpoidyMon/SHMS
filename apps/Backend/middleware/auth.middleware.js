import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const authenticate = (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts.length === 2 && parts[0] === "Bearer") {
                token = parts[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No authentication token provided"
            });
        }

        const decoded = JWT.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error: ", error.message);
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token"
        });
    }
};

export default authenticate;
