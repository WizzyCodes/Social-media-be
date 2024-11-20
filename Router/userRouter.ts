import { Router } from "express";
import {
  createUser,
  getAllUser,
  getOneUser,
} from "../controller/userController";

const userRouter: any = Router();

userRouter.route("/create-user").post(createUser);

userRouter.route("/get-all-user").get(getAllUser);
userRouter.route("/get-one-user/:userID").get(getOneUser);

export default userRouter;
