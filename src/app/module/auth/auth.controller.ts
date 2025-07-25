/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { authSevice } from "./auth.service";

const credintialsLogin= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo=await authSevice.credintialsLogin(req.body)
    
    // set accessToken
    res.cookie("accessToken",loginInfo.accessToken,{
      httpOnly:true,
      secure:false
    })
    // set refreshToken
    res.cookie("refreshToken",loginInfo.refreshToken,{
      httpOnly:true,
      secure:false
    })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully",
      data:loginInfo
    });
  }
)
const getNewUserToken= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken=req.cookies.refreshToken
    const tokenInfo=await authSevice.getNewUserToken(refreshToken as string)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully",
      data:tokenInfo,
    });
  }
)

export const authControllers={
    credintialsLogin,
    getNewUserToken
}