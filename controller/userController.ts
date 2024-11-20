import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import rateModel from "../model/rateModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashed,
    });

    return res.status(201).json({
      message: "user created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({});
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "user created succesfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return error;
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "user created successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const rateUser = async (req: Request, res: Response) => {
  try {
    const { rating } = req.body;
    const { ratedUserID } = req.params;
    const raterID = req.params.userID;

    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 0 and 5" });
    }

    const ratedUser = await userModel.findById(ratedUserID);
    if (!ratedUser) {
      return res.status(404).json({ message: "User to be rated not found" });
    }

    const existingRating = await rateModel.findOne({
      rater: raterID,
      ratedUser: ratedUserID,
    });
    if (existingRating) {
      existingRating.rating = new rating();
      existingRating.save();
    } else {
      await rateModel.create({
        rater: raterID,
        ratedUser: ratedUserID,
        rating,
      });
    }

    return res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUserRating = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const ratings = await rateModel.find({ ratedUser: userID });
    const averageRating =
      ratings.reduce((sum, rate) => sum + rate.rating, 0) /
      (ratings.length || 1);

    return res.status(200).json({
      message: "User rating fetched successfully",
      averageRating,
      totalRatings: ratings.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
