import { Schema, Document, Types, model } from "mongoose";

interface iRate {
  rater: {}; // The user who rates
  ratedUser: {}; // The user being rated
  rating: number; // Rating between 0 and 5
}

interface iRateData extends iRate, Document {}

const rateModel = new Schema<iRateData>(
  {
    rater: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    ratedUser: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export default model<iRateData>("rates", rateModel);
