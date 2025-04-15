import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { showBillsPage } from "../controller/pages.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/home");
})
router.get("/login", (req, res) => {
    res.render("pages/login");
})
router.get("/register", (req, res) => {
    res.render("pages/register");
})
router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("pages/dashboard");
})
router.get("/bills", isLoggedIn, showBillsPage);

router.get("/documents", isLoggedIn, (req, res) => {
    res.render("pages/documents");
})
router.get("/profile", isLoggedIn, (req, res) => {
    res.render("pages/profile");
})
router.get("/add-bill", isLoggedIn, (req, res) => {
    res.render("pages/add-bill");
})
router.get("/add-document", isLoggedIn, (req, res) => {
    res.render("pages/add-document");
})

export default router;