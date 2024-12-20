import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { connectDb } from "./DB/db.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use("/api/v1/auth", authRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, function () {
      console.log("app is listening on port :", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error: ", err);
  });
