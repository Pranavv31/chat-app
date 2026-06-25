import express from "express";

import {Login,signup} from "../controllers/auth.controller.js";
import { Logout, updateprofile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.put("/update-profile",protectRoute,updateprofile)
router.get("/check",protectRoute,checkAuth)

export default router; 