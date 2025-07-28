/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import appError from "../../errorHelpers/AppError";
import { createNewAccessTokenWithRefreshToken, } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


// const credintialsLogin = async (payload: Partial<Iuser>) => {
//   const { email, password } = payload;
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new appError(httpStatus.BAD_REQUEST, "user Already Exist");
//   }
//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExist.password as string
//   );

//   if (!isPasswordMatched) {
//     throw new appError(httpStatus.BAD_REQUEST, "password incorect");
//   }
//   const userToken = await createUserToken(isUserExist);

//   const userObj = isUserExist.toObject();
//   delete userObj.password;
//   return {
//     accessToken: userToken.accessToken,
//     refreshToken: userToken.refreshToken,
//     users: userObj,
//   };
// };

const getNewUserToken = async (refreshToken: string) => {
 const newAccessToken=await createNewAccessTokenWithRefreshToken(refreshToken)
  return {
    accessToken:newAccessToken
  };
};
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new appError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}
export const authSevice = {
  getNewUserToken,
  resetPassword
};
