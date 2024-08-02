import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import storeRouter from "./routes/storeRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import authRouter from "./routes/authRoutes.js"; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use('/auth', authRouter);
app.use("/stores", storeRouter);
app.use("/owner", ownerRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

console.log("CONNECTION_URL:", process.env.CONNECTION_URL);

if (!CONNECTION_URL) {
  console.error("CONNECTION_URL is not defined. Please check your .env file.");
  process.exit(1); 
}

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
