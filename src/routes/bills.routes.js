import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { addBill, updatebill } from "../controller/bills.controller.js";


const router = express.Router();

router.post("/addbill", isLoggedIn, addBill);
router.put("/updatebill/:id", updatebill);

export default router;