import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "",
      status = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.max(1, Number(limit) || 10);
    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};

    if (search) {
      const searchRegex = new RegExp((search as string).trim(), "i");
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
      ];
    }

    if (role && role !== "All") {
      filter.role = role;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const sortField = (sortBy as string);
    const sort: any = { [sortField]: sortDirection };

    const users = await User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    const total = await User.countDocuments(filter);

    const totalPages = Math.ceil(total / limitNumber);

    sendSuccess({
      res,
      statusCode: 200,
      message: "Users fetched successfully",
      data: users,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Failed to fetch users",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return sendError({
        res,
        statusCode: 400,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return sendError({
        res,
        statusCode: 404,
        message: "User not found",
      });
    }

    return sendSuccess({
      res,
      statusCode: 200,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Failed to fetch user",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, role, status, password } =
      req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError({
        res,
        statusCode: 400,
        message: "Email address is already exists",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone: phone || "",
      role: role || "User",
      status: status || "Active",
      password,
    });

    await newUser.save();

    return sendSuccess({
      res,
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Failed to create user",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { firstName, lastName, email, phone, role, status, password } =
      req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return sendError({
        res,
        statusCode: 400,
        message: "Invalid user ID format",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return sendError({
        res,
        statusCode: 404,
        message: "User not found",
      });
    }

    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      
      if (emailExists) {
        return sendError({
          res,
          statusCode: 400,
          message: "Email is already in use by another user",
        });
      }
      user.email = email.toLowerCase();
    }

    if (firstName !== undefined) {
      user.firstName = firstName;
    }

    if (lastName !== undefined) {
      user.lastName = lastName;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (status !== undefined) {
      user.status = status;
    }

    if (password && password.trim().length >= 6) {
      user.password = password;
    }

    await user.save();

    return sendSuccess({
      res,
      statusCode: 200,
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Failed to update user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return sendError({
        res,
        statusCode: 400,
        message: "Invalid user ID",
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return sendError({
        res,
        statusCode: 404,
        message: "User not found",
      });
    }

    return sendSuccess({
      res,
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return sendError({
      res,
      statusCode: 500,
      message: error.message || "Failed to delete user",
    });
  }
};
