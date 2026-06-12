
import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/database.js";

import authRouter from "./routes/authRoutes.js";
import meetingRouter from "./routes/meetingRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");


app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));


connectDB();

app.use(authRouter);
app.use(meetingRouter);
app.use(aiRouter);





const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
