import express from "express";
import reqAuth from "../middleware/reqAuth.middleware.js";
import reqRole from "../middleware/reqRole.middleware.js";
import { menuController } from "../controller/menu.controller.js";

const menuRouter = express.Router();

menuRouter.post("/createItem", reqAuth, reqRole("ADMIN", "MANAGER"), menuController.createMenuItem);
menuRouter.post("/deleteItem/:id", reqAuth, reqRole("ADMIN", "MANAGER"), menuController.deleteMenuItem);
menuRouter.put("/editItem/:id", reqAuth, reqRole("ADMIN", "MANAGER"), menuController.editMenuitem);
menuRouter.patch("/toggleIsAvail/:id", reqAuth, reqRole("ADMIN", "MANAGER", "CHEF"), menuController.isAvailableToggle);

export default menuRouter;
