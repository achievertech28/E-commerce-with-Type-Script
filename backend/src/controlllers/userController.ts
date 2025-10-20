import type { RequestHandler, Response, Request, NextFunction } from "express";
import User from "../models/userModel.ts";

export const getUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?._id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Fetch all users, excluding passwords

    res.status(200).json({
      paginateData: res.locals.paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};
