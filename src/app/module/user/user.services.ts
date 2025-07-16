import httpStatus from "http-status-codes";
import appError from "../../errorHelpers/AppError";
import { IAuthProviver, Iuser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"

const createUser=async (payload:Partial<Iuser>)=>{
        const { email, password, ...rest}=payload;
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            throw new appError(httpStatus.BAD_REQUEST,"user Already Exist");

        }
        const hashedPassword=await bcryptjs.hash(password as string, 10)

        
      
        
        const authProvider:IAuthProviver={provider:"credintial",providerID:email as string}
        const user=await User.create({
            email,
            password: hashedPassword,
            auths:authProvider,
            ...rest
        })
        return user
}

const getAllUser = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
};

export const userService={
    createUser,
    getAllUser
}