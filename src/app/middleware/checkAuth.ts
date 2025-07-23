import { NextFunction, Request, Response } from "express";
import appError from "../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken  } from "../utils/jwt"; 

export const checkAuth = (...authRole: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new appError(403, "No token received");
        }
        

        const decodedToken = verifyToken(accessToken, envVars.jwt_secret) as JwtPayload; // ✅ Use the renamed function

        req.user = decodedToken;

     if (!authRole.includes(decodedToken.role)) {
        throw new appError(403, "You're not authorized");
      }

        next();
    } catch (error) {
        next(error);
    }
};
