/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import appError from "../errorHelpers/AppError";
// Error-handling middleware
export const golobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  if (err instanceof appError) {
    statusCode=err.statusCode
    message=err.message
  }else if(err instanceof Error){
    statusCode=500;
    message=err.message
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
