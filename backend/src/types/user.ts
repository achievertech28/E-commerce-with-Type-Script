import { type Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  verified: boolean;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITokenPayload {
  userId: string;
  email: string;
  role: "customer" | "admin";
}

export interface IAuthRequest extends Request {
  user?: ITokenPayload;
}
