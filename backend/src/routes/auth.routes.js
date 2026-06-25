import express from "express";

import {Login,signup} from "../controllers/auth.controller.js";
import { Logout, updateprofile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.put("/update-profile",protechRoute,updateprofile)

export default router; 