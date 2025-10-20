import jwt from "jsonwebtoken";
import type { Response } from "express";
import { MS_IN_DAY, MS_IN_MINUTE } from "./timeUtils.ts";
import type mongoose from "mongoose";

const generateAccessToken = (
  res: Response,
  userId: mongoose.Types.ObjectId,
  sessionId: mongoose.Types.ObjectId
): void => {
  const accessToken = jwt.sign(
    { userId, sessionId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * MS_IN_MINUTE,
  });
};

const generateRefreshToken = (
  res: Response,
  sessionId: mongoose.Types.ObjectId
): void => {
  const refreshTokenSecret = (process.env.REFRESH_TOKEN_SECRET ||
    process.env.ACCESS_TOKEN_SECRET) as string;
  const refreshToken = jwt.sign({ sessionId }, refreshTokenSecret, {
    expiresIn: "30d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * MS_IN_DAY,

    path: "/api/auth/refresh",
  });
};

export { generateAccessToken, generateRefreshToken };
