/* eslint-disable @typescript-eslint/no-unused-vars */

import userController from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { Router } from "express";

const router = Router();


router.post("/register", validateRequest(createUserZodSchema),userController.createUser);
router.get("/all-users", userController.getAllUser);

export const UserRoutes = router;
