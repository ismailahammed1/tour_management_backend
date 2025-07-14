/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

const catchAsync = (fn:AsyncHandler)=>(req: Request, res: Response, next: NextFunction)=> {
  Promise.resolve(fn(req,res,next)).catch((err:any)=>{
    console.log(err);
    next(err)
    
  })
};
//same for reuse code it's a chatgpt code
// const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next); 
//   };
// };

export default catchAsync;
