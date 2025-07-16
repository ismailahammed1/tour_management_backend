import { Types } from "mongoose";

export enum Role{
    SUPER_ADMIN="SUPER_ADMIN",
    ADMIN="ADMIN",
    USER="USER",
    GUIDE="GUIDE",
}

//auth provider list 
/**
 * emaii,password
 * google authentication
 */
export interface IAuthProviver{
    provider:"gooogle"|"credintial";//goole ,credintial
    providerID:string;
}

export enum isActive{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED",
}

export interface Iuser{
    name:string;
    email: string;
    password?:string;
    picture?:string;
    phone?:string;
    address?:string;
    isDeleted?:string;
    isActive?:isActive;
    isVerified?:string;

    auths:IAuthProviver;
    role:Role;
    bookings?:Types.ObjectId[];
    guides?:Types.ObjectId[];
}