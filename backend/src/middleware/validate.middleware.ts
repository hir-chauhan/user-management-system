import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/apiResponse.js';

export const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
    
        sendError({
          res,
          statusCode: 400,
          message: error.errors[0]?.message || 'Validation error',

        });
        return;
      }
      sendError({
        res,
        statusCode: 400,
        message: 'Invalid request data',
      });
    }
  };
