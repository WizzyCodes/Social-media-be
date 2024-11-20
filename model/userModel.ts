import { Schema, Document, Types, model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  userName: string;
  avatar: string;
  avatarID: string;
  post: Array<{}>;
  ratings: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    post: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
    ratings: [
      {
        type: Types.ObjectId,
        ref: "rates", // Reference to the rate model
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
