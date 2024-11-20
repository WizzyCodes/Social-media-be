import { Request, Response } from "express";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import commentModel from "../model/commentModel";
import { Types } from "mongoose";
import replyModel from "../model/replyModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const { message } = req.body;

    const findUser = await userModel.findById(userID);
    if (findUser) {
      const findPost = await postModel.findById(postID);
      if (findPost) {
        const comment: any = await commentModel.create({
          message,
          createdAt: Date.now(),
        });
        findPost?.comment.push(new Types.ObjectId(comment?._id));
        findPost.save();

        return res.status(201).json({
          message: "User's post created successfully",
          data: comment,
          status: 201,
        });
      } else {
        return res.status(404).json({
          error: "Error creating comment for post",
        });
      }
    } else {
      return res.status(404).json({
        error: "You are not authorized to create a comment, not a user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const likeOneUserComment = async (req: Request, res: Response) => {
  try {
    const { userID, commentID } = req.params;
    const user = await userModel.findById(userID);
    const comment: any = await commentModel.findById(commentID);
    await commentModel.findByIdAndUpdate(
      commentID,
      {
        like: [comment.like, userID],
      },
      { new: true }
    );

    return res.status(200).json({
      message: "like created successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const replyAUserComment = async (req: Request, res: Response) => {
  try {
    const { userID, commentID } = req.params;
    const { message } = req.body;

    const user = await userModel.findById(userID);
    if (user) {
      const comment = await commentModel.findById(commentID);
      if (comment) {
        const reply = await replyModel.create({
          message,
          user: userID,
          commentID,
          createdAt: Date.now(),
        });

        comment.replies.push(new Types.ObjectId(reply?.id));
        comment.save();
        return res
          .status(201)
          .json({ message: "Reply added successfully", reply: reply });
      } else {
        return res.status(404).json({ message: "Comment not found" });
      }
    } else {
      return res.status(404).json({ message: "not a user so cannot reply" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllCommentsOnPost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    const post = await postModel.findById(postID).populate({
      path: "comment",
      model: commentModel,
      populate: [
        {
          path: "userID",
          model: userModel,
          select: "userName email avatar",
        },
        {
          path: "replies",
          model: replyModel,
          populate: {
            path: "user",
            model: userModel,
            select: "userName email avatar",
          },
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "All comments on the post retrieved successfully",
      data: post.comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching comments",
      error: error,
    });
  }
};
