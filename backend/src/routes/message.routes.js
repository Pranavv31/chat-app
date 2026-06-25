import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import messageModel from "../models/message.model.js"
import { getUserForSidebar, sendMessage } from "../controllers/message.controller.js";

const router =  express.Router();

router.get("/users",protectRoute,getUserForSidebar);
router.get("/:id",protectRoute,sendMessage);  
router.post("/send/:id");

export default router;