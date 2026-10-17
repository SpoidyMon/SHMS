import express from "express"
import reqAuth from "../middleware/reqAuth.middleware"
import reqRole from "../middleware/reqRole.middleware"
import adminController from "../controller/admin.controller"

const adminRouter=express.Router()

// /admin --> primary route
// adminRouter.post("/create-staff",reqAuth,reqRole("ADMIN"),adminController.createStaffMember)
adminRouter.post("/create-staff",adminController.createStaffMember)
adminRouter.post("/resend-inviteEmail",adminController.resendInvitaionEmail)

export default adminRouter
