import User from "../models/userModel.ts";
import type { NextFunction, Request, Response } from "express";
import { decodeAccessTokenPayload } from "../utils/jwtUtils.ts";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    try {
      const { userId, sessionId } = decodeAccessTokenPayload(accessToken);

      req.user = await User.findById(userId).select("-password");
      req.sessionId = sessionId;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
      next(error);
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Not authenticated. Please create an account or login",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Access denied. Required role(s): ${roles.join(
          ", "
        )}. Your role: ${req.user.role}`,
      });
      return;
    }

    next();
  };
};

export const adminOnly = authorize("admin");
