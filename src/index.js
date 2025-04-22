import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import cron from "node-cron";

import connectDB from "./utils/db.js";
import pagesRoutes from "./routes/pages.routes.js";
import userRoutes from "./routes/user.routes.js";
import billsRoutes from "./routes/bills.routes.js";
import { sendReminders } from "./utils/sendReminder.js";

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


// html pages routes
app.use("/", pagesRoutes);


// user routes
app.use("/api/v1/user", userRoutes);


// bills routes
app.use("/api/v1/bills", billsRoutes);


// ⏰ Schedule to run every day at 9:00 AM
cron.schedule('0 9 * * *', () => {
    console.log('⏰ Sending daily reminders...');
    sendReminders();
  });


app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});