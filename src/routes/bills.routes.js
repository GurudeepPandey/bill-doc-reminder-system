import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { addBill } from "../controller/bills.controller.js";


const router = express.Router();

router.post("/addbill", isLoggedIn, addBill);

export default router;