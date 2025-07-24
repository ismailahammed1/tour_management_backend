import { isActive, Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import appError from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userToken";
import { generatToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credintialsLogin = async (payload: Partial<Iuser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new appError(httpStatus.BAD_REQUEST, "user Already Exist");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new appError(httpStatus.BAD_REQUEST, "password incorect");
  }
  const userToken = await createUserToken(isUserExist);

  const userObj = isUserExist.toObject();
  delete userObj.password;
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    users: userObj,
  };
};

const getNewUserToken = async (refreshToken: string) => {
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

  return {
    accessToken,
  };
};
export const authSevice = {
  credintialsLogin,
  getNewUserToken,
};
