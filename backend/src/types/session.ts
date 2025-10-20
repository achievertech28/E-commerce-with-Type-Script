import mongoose, { Document, Types } from "mongoose";

export interface ISession extends Document {
  _id: Types.ObjectId;
  UserId: mongoose.Types.ObjectId;
  createdAt: Date;
  expiresAt: Date;
}
