import { Router } from "express";
import {
  createPost,
  getAllPost,
  getOneUserPost,
  likeOneUserPost,
} from "../controller/postController";

const postRouter: any = Router();

postRouter.route("/create-post/:userID").post(createPost);
postRouter.route("/get-all-post").get(getAllPost);
postRouter.route("/get-user-post/:userID").get(getOneUserPost);

postRouter.route("/like-user-post/:userID/:postID").patch(likeOneUserPost);

export default postRouter;
