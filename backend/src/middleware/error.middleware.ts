import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/apiResponse.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  sendError({
    res,
    statusCode,
    message,
  });
};