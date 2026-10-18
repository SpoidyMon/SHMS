import express from "express";
import reqAuth from "../middleware/reqAuth.middleware.js";
import reqRole from "../middleware/reqRole.middleware.js";
import adminController from "../controller/admin.controller.js";

const adminRouter = express.Router();

// Apply authentication and ADMIN role check to all admin routes
adminRouter.use(reqAuth, reqRole("ADMIN"));
// /admin --> primary route
// adminRouter.post("/create-staff",reqAuth,reqRole("ADMIN"),adminController.createStaffMember)
adminRouter.post("/create-staff",adminController.createStaffMember)
adminRouter.post("/resend-inviteEmail",adminController.resendInvitaionEmail)

// // Admin staff management routes
// adminRouter.post("/create-staff", adminController.createStaffMember);
// adminRouter.post("/resend-inviteEmail", adminController.resendInvitaionEmail);
adminRouter.get("/staff", adminController.listallstaff);
adminRouter.patch("/deactivate-staff", adminController.deactivateUser);
adminRouter.delete("/delete-staff", adminController.deleteStaff);

export default adminRouter;
