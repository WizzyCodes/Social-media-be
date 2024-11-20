import { Schema, Document, Types, model } from "mongoose";

interface iReply {
  message: string;
  createdAt: Date;
  user: {};
  commentId: {};
  like: Array<string>;
  image: string;
  imageID: string;
}

interface iReplyData extends iReply, Document {}

const replyModel = new Schema<iReplyData>(
  {
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
    },
    commentId: {
      type: Types.ObjectId,
      ref: "comments",
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    like: {
      type: [],
    },
  },
  { timestamps: true }
);

export default model<iReplyData>("replies", replyModel);
