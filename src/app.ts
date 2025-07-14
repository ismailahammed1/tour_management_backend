/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { golobalErrorHandler } from "./app/middleware/golobalErrorHandler";
import notFound from "./app/middleware/notFound";



const app = express();

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
