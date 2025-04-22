import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { addBill, updatebill, deleteBill, markPaid} from "../controller/bills.controller.js";


const router = express.Router();

router.post("/addbill", isLoggedIn, addBill);
router.put("/updatebill/:id", updatebill);
router.delete("/deletebill/:id", isLoggedIn, deleteBill);
router.put("/mark-paid/:id", isLoggedIn, markPaid);

export default router;