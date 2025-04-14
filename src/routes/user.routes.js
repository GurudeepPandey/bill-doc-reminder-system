import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {registerUser, verifyUser, loginUser, logoutUser} from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/logout", isLoggedIn, logoutUser);

export default router;