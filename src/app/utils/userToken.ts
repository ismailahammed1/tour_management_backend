import { envVars } from "../config/env";
import appError from "../errorHelpers/AppError";
import { isActive, Iuser } from "../module/user/user.interface";
import { generatToken, verifyToken } from "./jwt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../module/user/user.model";
export const createUserToken = async (user: Partial<Iuser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generatToken(
    jwtPayload,
    envVars.jwt_secret,
    envVars.jwt_Expired
  );
  const refreshToken = generatToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRETS,
    envVars.JWT_REFRESH_EXPIRES
  );
  return {
    accessToken,
    refreshToken,
  };
};
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRETS
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
  if (!isUserExist) {
    throw new appError(httpStatus.BAD_REQUEST, "user dose not Exist");
  }
  if (
    isUserExist.isActive === isActive.BLOCKED ||
    isUserExist.isActive === isActive.INACTIVE
  ) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      `user is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new appError(httpStatus.BAD_REQUEST, "user id deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generatToken(
    jwtPayload,
    envVars.jwt_secret,
    envVars.jwt_Expired
  );
  return accessToken
};
