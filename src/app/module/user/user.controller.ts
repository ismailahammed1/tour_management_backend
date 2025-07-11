/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const {name,email}=req.body;
    const user=await User.create({
        name,
        email
    })
    res.status(201).json({
        massage:"User Create Successfully",
        user
    })
  } catch (err:any) {
    res.status(400).json({
        massage:`Something went wrong${err.massage}`,

    })
    
  }
};

export default { createUser };
