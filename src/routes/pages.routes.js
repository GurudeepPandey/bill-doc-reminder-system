import express from "express";

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
router.get("/dashboard", (req, res) => {
    res.render("pages/dashboard");
})
router.get("/bills", (req, res) => {
    res.render("pages/bills");
})
router.get("/documents", (req, res) => {
    res.render("pages/documents");
})
router.get("/profile", (req, res) => {
    res.render("pages/profile");
})
router.get("/add-bill", (req, res) => {
    res.render("pages/add-bill");
})
router.get("/add-document", (req, res) => {
    res.render("pages/add-document");
})

export default router;