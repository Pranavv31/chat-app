import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import messageModel from "../models/message.model.js"
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";

const router =  express.Router();

router.get("/users",protectRoute,getUserForSidebar);
router.get("/:id",protectRoute,getMessages);  
router.post("/send/:id", protectRoute,sendMessage);
   

export default router;  