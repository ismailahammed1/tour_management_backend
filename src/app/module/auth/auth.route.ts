import { Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";

import { Role } from "../user/user.interface";

const router = Router();
router.post('/login', authControllers.credintialsLogin)
router.post('/refresh-Token', authControllers.getNewUserToken)
router.post('/logout', authControllers.logout)
router.post('/reset-password', checkAuth(...Object.values(Role)), authControllers.resetPassword)


export const AuthRoutes = router;
