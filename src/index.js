import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "../public")));
app.set("views", path.resolve("./src/views"));


connectDB();
console.log("Views folder:", app.get("views"));
console.log("Static folder path:", path.join(__dirname, "../public"));



app.get("/", (req, res) => {
    res.render("pages/home");
})
app.get("/login", (req, res) => {
    res.render("pages/login");
})
app.get("/register", (req, res) => {
    res.render("pages/register");
})



app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});