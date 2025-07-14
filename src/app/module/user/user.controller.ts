/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { userService } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    // res.status(201).json({
    //   success: true,
    //   message: "User created successfully",
    //   user,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);
const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUser();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);


export default { createUser, getAllUser };
