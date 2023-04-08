import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email }).select("+password");

    // if user doesn't exist
    if (!user) {
      return next(new ErrorHandler("Invalid Email/password", 400));
    }

    //   if user exist
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Password or email not matching", 400));
    }

    sendCookie(user, res, `Welcome ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// create new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //   finding user
    let user = await User.findOne({ email: email });

    if (user) {
      return next(new ErrorHandler("user already exist", 400));
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //   if user not available then create
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //   calling feature code for cookies

    sendCookie(user, res, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

// user details
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// logout
export const logout = (req, res) => {
  // logout means destroying cookie
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout out successfully",
    });
};
