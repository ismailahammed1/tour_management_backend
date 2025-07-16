import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();
router.post('/login', authControllers.credintialsLogin)


export const AuthRoutes = router;
