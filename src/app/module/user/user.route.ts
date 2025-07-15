/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import userController from "./user.controller";
import z from "zod";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();


router.post("/register", validateRequest(createUserZodSchema),userController.createUser);
router.get("/all-users", userController.getAllUser);

export const UserRoutes = router;
