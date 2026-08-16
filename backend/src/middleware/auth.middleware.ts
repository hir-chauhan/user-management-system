import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.js";
import { sendError } from "../utils/apiResponse.js";

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError({
        res,
        statusCode: 401,
        message: "Unauthorized: Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return sendError({
        res,
        statusCode: 401,
        message: "Authentication token is required",
      });
    }

    const user = verifyToken(token);

    req.user = user;

    next();
  } catch (error) {
    return sendError({
      res,
      statusCode: 401,
      message: "Invalid or expired token",
    });
  }
};
