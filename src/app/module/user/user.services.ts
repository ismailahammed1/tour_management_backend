import httpStatus from "http-status-codes";
import appError from "../../errorHelpers/AppError";
import { IAuthProviver, Iuser } from "./user.interface";
import { User } from "./user.model";

const createUser=async (payload:Partial<Iuser>)=>{
        const {email, ...rest}=payload;
        const isUserExist = await User.findOne({email})
        if (isUserExist) {
            throw new appError(httpStatus.BAD_REQUEST,"user Already Exist");

        }
        const authProvider:IAuthProviver={provider:"credintial",providerID:email as string}
        const user=await User.create({
            email,
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