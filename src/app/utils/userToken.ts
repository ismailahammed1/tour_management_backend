import { envVars } from "../config/env";
import { Iuser } from "../module/user/user.interface";
import { generatToken } from "./jwt";

export const createUserToken= async(user:Partial<Iuser>)=>{
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
    refreshToken
  }
}