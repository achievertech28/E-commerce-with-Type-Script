import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Response } from "express";

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
  sessionId: string;
}

export interface refreshTokenPayload extends JwtPayload {
  sessionId: string;
}

export const decodeAccessTokenPayload = (token: string): AccessTokenPayload => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET enviroment variale is not defined.");
  }

  try {
    const decoded = jwt.verify(token, secret) as AccessTokenPayload;

    if (!decoded.userId || !decoded.sessionId) {
      throw new Error("invalid token payload structure");
    }

    return decoded;
  } catch (error) {
    console.error("Token decoding failed:", error);

    throw new Error("invalid or expired Access Token");
  }
};

export const decodeRefreshTokenPayload = (
  token: string
): refreshTokenPayload => {
  const secret =
    process.env.REFRESH_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error("jwt_secret enviroment variable is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret) as refreshTokenPayload;

    if (!decoded.sessionId) {
      throw new Error("invalid refresh token payload structure");
    }

    return decoded;
  } catch (error) {
    console.log("refresh token decoding failed:", error);
    throw new Error("invalid or expired refresh token");
  }
};

export const clearAuthCookies = (res: Response) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("accesssToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/api/auth/refresh",
  });

  console.log("[cookie service] access and refresh cookies cleared");
};
