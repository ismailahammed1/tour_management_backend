/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authSevice } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookies";
import { JwtPayload } from "jsonwebtoken";
import appError from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config/env";
import passport from "passport";

const credintialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await authSevice.credintialsLogin(req.body);

    passport.authenticate("local", async (error: any, user: any, info: any) => {
      if (error) {
        return next(new appError(401, info.message));
      }
      if (!user) {
        return next(new appError(401, info.message));
      }

      const userTokens = await createUserToken(user);

      const userObj = user.toObject();
      delete userObj.password;

      setAuthCookie(res, userTokens);

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User login successfully",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user:userObj
        },
      });
    })(req, res, next);
    // set accessToken
    // set refreshToken
  }
);
const getNewUserToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await authSevice.getNewUserToken(refreshToken as string);
    // set accessToken
    setAuthCookie(res, tokenInfo);
    // res.cookie("accessToken",tokenInfo.accessToken,{
    //   httpOnly:true,
    //   secure:false
    // })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access token retrived successfully",
      data: tokenInfo,
    });
  }
);
const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user Logout successfully",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await authSevice.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed Successfully",
      data: null,
    });
  }
);
const googleCallBackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;
    // console.log(user);

    if (!user) {
      throw new appError(httpStatus.NOT_FOUND, "user not found");
    }

    const tokenInfo = await createUserToken(user);

    setAuthCookie(res, tokenInfo);

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: tokenInfo,
    // })

    res.redirect(`${envVars.FRONT_END_URL}/${redirectTo}`);
  }
);

export const authControllers = {
  credintialsLogin,
  getNewUserToken,
  logout,
  resetPassword,
  googleCallBackController,
};
