import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login first",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // find user & saving in req
  req.user = await User.findById(decodedData._id);
  /**
   * It means as we have req obj , now we can access user as req.user  as "user = await User.findById(decodedData._id);"
   */

  next();
};
