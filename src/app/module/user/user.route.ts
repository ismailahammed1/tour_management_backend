import userController from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
router.get("/all-users",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUser);
router.patch(
  "/:id",
  checkAuth(...Object.values(Role)), 
  userController.updateUser 
);

export const UserRoutes = router;
