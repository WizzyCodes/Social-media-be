import { Schema, Document, Types, model } from "mongoose";

interface iUser {
  message: string;
  image: string;
  imageID: string;
  user: {};
  like: Array<string>;
  comment: Array<{}>;
}

interface iPostData extends iUser, Document {}

const postModel = new Schema<iPostData>(
  {
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: "users",
    },
    like: {
      type: [],
      default: ["0"],
    },
    comment: [
      {
        type: Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

export default model<iPostData>("posts", postModel);
