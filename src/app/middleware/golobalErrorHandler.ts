/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import appError from "../errorHelpers/AppError";
import { ZodError } from "zod";

// Global Error Handler Middleware
export const golobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

     if (envVars.NODE_ENV ==="development") {
      console.log(err);
      
    }
  let statusCode = 500;
  let message = "Something went wrong";

  // Duplicate key error (MongoDB unique constraint violation)
  if (err.code === 11000) {
    const matchedArray = err.message.match(/"([^"]*)"/);
    statusCode = 400;
    const duplicateField = matchedArray ? matchedArray[1] : "Field";
    message = `${duplicateField} already exists!`;
  }

  // Invalid MongoDB ObjectId
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid id";
  }

  // Mongoose validation error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);
      const errorSources: any[] = [];
    errors.forEach((errorObj: any) => {
      errorSources.push({
        path: errorObj.path,
        message: errorObj.message,
      });
    });
    message = "Validation Error";
  }

  else if (err instanceof ZodError) {
  statusCode = 400;
  message = "Validation Error from Zod";
  const errorSources: any[] = [];

  err.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path.join("."),
      message: issue.message,
    });
  });
}
  // Custom AppError
  else if (err instanceof appError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Generic Error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err: envVars.NODE_ENV === "development" ? err : undefined,
    stack: envVars.NODE_ENV === "development" ? err.stack : undefined,
  });
};
