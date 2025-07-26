import { NextFunction, Request, Response } from "express";
import appError from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { User } from "../module/user/user.model";
import httpStatus from "http-status-codes";
import { isActive } from "../module/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new appError(403, "No Token Recieved")
        }


        const verifiedToken = verifyToken(accessToken, envVars.jwt_secret) as JwtPayload

        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new appError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
            throw new appError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }
        if (isUserExist.isDeleted) {
            throw new appError(httpStatus.BAD_REQUEST, "User is deleted")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new appError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}