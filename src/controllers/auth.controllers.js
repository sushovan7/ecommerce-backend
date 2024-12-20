import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import transporter from "../nodemailer/nodemailer.config.js";
import { welcomeEmail } from "../utils/emailTemplates/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env);

export async function signup(req, res) {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the inputs fields are required",
    });
  }

  try {
    const checkingEmailAlreadyExists = await userModel.findOne({
      email,
    });
    if (checkingEmailAlreadyExists) {
      return res.status(409).json({
        message: "Email already exists in our database",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userInfo = await userModel.create({
      fullname: fullname.toLowerCase(),
      email,
      password: hashPassword,
    });

    const userCreated = await userModel
      .findById(userInfo._id)
      .select("-password");

    if (!userCreated) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }

    await transporter.sendMail({
      from: "bhattaraisushovan999@gmail.com",
      to: email,
      subject: "Welcome to Our E-commerce",
      html: welcomeEmail.replace("[Recipient's Name]", fullname),
    });

    return res.status(201).json({
      success: true,
      message: "You are signed up successfully",
      user: userCreated,
    });
  } catch (error) {
    console.error("Signup error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function signin() {}
export async function logout() {}
