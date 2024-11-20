import { Application, Request, Response } from "express";
import userRouter from "./Router/userRouter";
import rateRouter from "./Router/rateRouter";
import commentRouter from "./Router/commentRouter";
import postRouter from "./Router/postRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api/user", userRouter);
    app.use("/api/rate", rateRouter);
    app.use("/api/comment", commentRouter);
    app.use("/api/post", postRouter);

    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "Awesome APi",
        });
      } catch (error) {
        res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
