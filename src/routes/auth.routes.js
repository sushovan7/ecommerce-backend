import express from "express";
import { signup, signin, logout } from "../controllers/auth.controllers.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);
