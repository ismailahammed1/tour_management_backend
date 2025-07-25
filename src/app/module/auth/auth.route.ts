import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();
router.post('/login', authControllers.credintialsLogin)
router.post('/refresh-Token', authControllers.getNewUserToken)


export const AuthRoutes = router;
