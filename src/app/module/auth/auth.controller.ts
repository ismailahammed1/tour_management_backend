/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { authSevice } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookies";
import { JwtPayload } from "jsonwebtoken";

const credintialsLogin= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo=await authSevice.credintialsLogin(req.body)
    
    // set accessToken
    // set refreshToken
  setAuthCookie(res,loginInfo)

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
    // set accessToken
      setAuthCookie(res,tokenInfo)
    // res.cookie("accessToken",tokenInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access token retrived successfully",
      data:tokenInfo,
    });
  }
)
const logout= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    res.clearCookie("accessToken", {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    res.clearCookie("refreshToken", {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user Logout successfully",
      data:null,
    });
  }
)
const resetPassword= catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
     const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await authSevice.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
  }
)

export const authControllers={
    credintialsLogin,
    getNewUserToken,
    logout,
    resetPassword
}