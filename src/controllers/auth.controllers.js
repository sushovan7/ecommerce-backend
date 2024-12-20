import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import transporter from "../nodemailer/nodemailer.config.js";
import {
  welcomeEmail,
  verifyEmail,
} from "../utils/emailTemplates/emailTemplates.js";

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
    const otp = Math.floor(100000 + Math.random() * 90000);

    const userInfo = await userModel.create({
      fullname: fullname.toLowerCase(),
      email,
      password: hashPassword,
      generateEmailVerifyOtp: otp,
      emailVerifyOtpExpiresAt: Date.now() + 15 * 60 * 1000,
    });

    const userCreated = await userModel
      .findById(userInfo._id)
      .select(
        "-password -updatedAt -createdAt -emailVerifyOtpExpiresAt -lastLogin"
      );

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
      html: welcomeEmail
        .replace("[User's Name]", fullname)
        .replace("[OTP_CODE]", userCreated.generateEmailVerifyOtp),
    });

    return res.status(201).json({
      success: true,
      message: `Signup successful. Verify your email with the OTP sent to your email address :${email}`,
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

export async function verifyUserEmail(req, res) {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    res.status(400).json({
      success: false,
      message: "User ID and OTP are required",
    });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.generateEmailVerifyOtp !== otp || user.otpExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    await transporter.sendMail({
      from: "bhattaraisushovan999@gmail.com",
      to: user.email,
      subject: "Welcome to Our E-commerce",
      html: verifyEmail.replace("[User's Name]", user.fullname),
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: user,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
