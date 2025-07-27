/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { golobalErrorHandler } from "./app/middleware/golobalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport"; 
import { envVars } from "./app/config/env";


const app = express();

app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
       message: "hello server"
    });
});

app.use(golobalErrorHandler)
app.use(notFound)


export default app;
