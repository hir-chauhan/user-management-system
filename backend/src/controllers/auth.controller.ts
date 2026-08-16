import { Request, Response } from "express";
import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return sendError({
        res,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return sendError({
        res,
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    if (user.status === "Inactive") {
      return sendError({
        res,
        statusCode: 403,
        message: "Your account is inactive. Please contact the administrator.",
      });
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return sendSuccess({
      res,
      statusCode: 200,
      message: "User Login successful",
      data: {
        token,
        user: userData,
      },
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Login failed",
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  return sendSuccess({
    res,
    statusCode: 200,
    message: "Logged out successfully",
    data: null,
  });
};
