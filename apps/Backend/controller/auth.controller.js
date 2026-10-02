import { prisma as Prisma } from "../config/database"

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(404).json({
                message: "Credentials Required"
            })
        }

        const user = await Prisma.user.findUnique({ email });
        if (user) {
            res.status(405).json({
                message:"User already exist"
            })
        }
        
    } catch (error) {

    }
}


const authController = {}

export default authController;