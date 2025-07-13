import { model, Schema } from "mongoose";
import { IAuthProviver, isActive, Iuser, Role } from "./user.interface";

const authProviderSchama=new Schema<IAuthProviver>({
    provider:{type:String, required:true},
    providerID:{type:String, required:true},
},{
    versionKey:false,
    _id:false,
}
)


const userSchema=new Schema<Iuser>({
    name:{type:String, required:true},
    email:{type:String, required:true , unique:true},
    password:{type:String},
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER
    },
    phone:{type:String},
    picture:{type:String},
    address:{type:String},
    isDeleted:{type:Boolean, default:false},
    isActive:{
        type:String,
        enum:Object.values(isActive),
        default:isActive.ACTIVE
    },
    isVerified:{type:Boolean,default:false},
    auths:[authProviderSchama]
},{
    timestamps:true,
    versionKey:false,
})

export const User=model<Iuser>("user", userSchema)
