import { Schema, Types, Document, model } from "mongoose";

interface iComment {
  message: string;
  userID: {};
  replies: Array<{}>;
  createdAt: Date;
  like: Array<string>;
  image: string;
  imageID: string;
}

interface iCommentData extends iComment, Document {}

const commentModel = new Schema<iCommentData>(
  {
    message: {
      type: String,
      required: true,
    },
    userID: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    replies: [
      {
        type: Types.ObjectId,
        ref: "replies",
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    like: {
      type: [],
      default: ["0"],
    },
  },
  { timestamps: true }
);

export default model<iCommentData>("comments", commentModel);
