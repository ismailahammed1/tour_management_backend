/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userService } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
   
    const user=await userService.createUser(req.body)
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
