/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { authSevice } from "./auth.service";

const credintialsLogin= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo=await authSevice.credintialsLogin(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully",
      data:loginInfo
    });
  }
)

export const authControllers={
    credintialsLogin
}