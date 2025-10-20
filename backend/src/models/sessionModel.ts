import mongoose, { SchemaTypes } from "mongoose";
import { thirtyDaysFromNow } from "../utils/timeUtils.ts";
import type { ISession } from "../types/session.ts";

const sessionSchema = new mongoose.Schema<ISession>({
  UserId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: thirtyDaysFromNow },
});

const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
