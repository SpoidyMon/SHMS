import prisma, { prisma as Prisma } from "../config/database"
import { sendEmail } from "../Services/email.server"
import { staffInviteTemplate } from "../Utils/util"
import crypto from "crypto"

const sanitizer = (user) => {
    if (!user) return null
    return {
        iid: user.id,
        username: user.username,
        email: user.email,
        mobileNo: user.mobileNo,
        role: user.role,
        verified: user.verified,
        createdAt: user.createdAt
    }
}

const createStaffMember = async (req, res) => {
    try {
        const { username, email, mobileNo, role } = req.body
        if (!username || !email || !mobileNo || !role) {
            return res.status(400).json({
                message: "Username,email and mobile No is required"
            })
        }

        const existingUser = await Prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(409).json({
                message: "staff with this email already exist"
            })
        }

        const token = crypto.randomBytes(32).toString("hex")
        const invitedUser = await Prisma.user.create({
            data: {
                username,
                email,
                mobileNo,
                role,
                //temporary token for the link
                inviteTokenHash: crypto.createHash("sha256").update(token).digest("hex"),
                inviteExpiresAt: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                )

            }
        })
        const inviteLink = `http://localhost:5173/api/auth/set-password?token=${token}`
        const inviteHtml = staffInviteTemplate(inviteLink, role)

        await sendEmail(email, `Admin's Invitation as ${role}`, `Your Invite link is ${inviteLink}`, inviteHtml)

        return res.status(201).json({
            message: "Invitation Send Successfully.",
            user: sanitizer(invitedUser)
        });
    } catch (error) {
        console.error("Error in createstaffMember: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const resendInvitaionEmail = async (req, res) => {
    try {
        const { username, email, role, mobileNo } = req.body

        const isUserExisting = await Prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!isUserExisting) {
            return res.status(404).json({
                message: "User with this Email doesn't exist"
            })
        }

        //fully resgitered or not 
        if (isUserExisting.hashedpassword) {
            return res.status(400).json({
                message: "Staff member has already set their password.",
            });
        }

        if (isUserExisting.status === "ACTIVE") {
            return res.status(409).json({
                message: "Staff has already accepted the invited"
            })
        }

        //checking token expiration
        const istokenExpired = !isUserExisting.inviteExpiresAt || !isUserExisting.inviteTokenHash || isUserExisting.inviteExpiresAt <= Date.now()

        if (!istokenExpired) {
            return res.status(409).json({
                message: "Previous Token is still valid"
            })
        }

        //regenerating token 
        const token = crypto.randomBytes(32).toString("hex")
        await Prisma.user.update({
            where: {
                email
            },
            data: {
                inviteTokenHash: crypto.createHash("sha256").update(token).digest("hex"),
                inviteExpiresAt: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                )
            }
        })

        const inviteLink = `http://localhost:5173/api/auth/set-password?token=${token}`
        const inviteHtml = staffInviteTemplate(inviteLink, role)

        await sendEmail(email, `Admin's Invitation as ${role}`, `Your Invite link is ${inviteLink}`, inviteHtml)

        return res.status(201).json({
            message: "Invitation Send Successfully.",
            user: sanitizer(invitedUser)
        });
    } catch (error) {
        console.error("Error in resendInvitationEmail: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}
const adminController = { createStaffMember,resendInvitaionEmail }
export default adminController 