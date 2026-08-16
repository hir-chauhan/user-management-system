import { Response } from 'express';

export interface ApiResponseOptions<T = any> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: Record<string, any>;
}

export const sendSuccess = <T = any>({
  res,
  statusCode = 200,
  message = 'Success',
  data,
  meta,
}: ApiResponseOptions<T>) => {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const sendError = ({
  res,
  statusCode = 500,
  message = 'Internal Server Error',
}: {
  res: Response;
  statusCode?: number;
  message?: string;
}) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
};
