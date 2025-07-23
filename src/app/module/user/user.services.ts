import httpStatus from "http-status-codes";
import appError from "../../errorHelpers/AppError";
import { AuthProviderType, IAuthProviver, Iuser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser=async (payload:Partial<Iuser>)=>{
        const { email, password, ...rest}=payload;
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            throw new appError(httpStatus.BAD_REQUEST,"user Already Exist");

        }
        const hashedPassword=await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

        
      
        
        const authProvider:IAuthProviver={provider:AuthProviderType.CREDENTIAL, providerID:email as string}
        const user=await User.create({
            email,
            password: hashedPassword,
            auths:authProvider,
            ...rest
        })
        return user
}

const updateUser=async(userId:string, payload:Partial<Iuser>, decodeToken:JwtPayload)=>{

     const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new appError(httpStatus.NOT_FOUND, "User Not Found")
    }
      if (payload.role) {
        if (decodeToken.role === Role.USER || decodeToken.role === Role.GUIDE) {
            throw new appError(httpStatus.FORBIDDEN, "You are not authorized");
        }

        if (payload.role === Role.SUPER_ADMIN && decodeToken.role === Role.ADMIN) {
            throw new appError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodeToken.role === Role.USER || decodeToken.role === Role.GUIDE) {
            throw new appError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser
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
    getAllUser,
    updateUser
}