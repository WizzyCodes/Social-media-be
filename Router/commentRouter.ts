import { Router } from "express";
import {
  createComment,
  getAllCommentsOnPost,
  likeOneUserComment,
  replyAUserComment,
} from "../controller/commentController";

const commentRouter: any = Router();

commentRouter.route("/create-comment/:userID/:postID").post(createComment);

commentRouter
  .route("/reply-comment/:userID/:commentID")
  .post(replyAUserComment);

commentRouter
  .route("/like-user-comment/:userID/:commentID")
  .patch(likeOneUserComment);

commentRouter.route("/post/:postID/comments").get(getAllCommentsOnPost);

export default commentRouter;
