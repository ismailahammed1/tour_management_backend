import { Iuser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import appError from "../../errorHelpers/AppError";


const credintialsLogin=async(payload: Partial<Iuser>)=>{
    const { email, password}=payload;
        const isUserExist = await User.findOne({email})
        if (!isUserExist) {
            throw new appError(httpStatus.BAD_REQUEST,"user Already Exist");

        }
        const isPasswordMatched=await bcryptjs.compare(password as string, isUserExist.password as string)

        if (!isPasswordMatched) {
            throw new appError(httpStatus.BAD_REQUEST,"password incorect")
        }
    
        return {
          email:isUserExist.email
        }
}
export const authSevice={
    credintialsLogin
}