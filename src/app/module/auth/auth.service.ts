import { Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import appError from "../../errorHelpers/AppError";
import { generatToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createUserToken } from "../../utils/userToken";

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
  const userToken=await createUserToken(isUserExist)

const userObj = isUserExist.toObject();
delete userObj.password;
  return {
    accessToken:userToken.accessToken,
    refreshToken:userToken.refreshToken,
    users: userObj,
  };
};
export const authSevice = {
  credintialsLogin,
};
