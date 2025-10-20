import { Router } from "express";
import User from "../models/userModel.ts";
import { getUserHandler, getAllUsers } from "../controlllers/userController.ts";
import { adminOnly } from "../middleware/authMiddleware.ts";
import paginate from "../middleware/paginate.ts";

const userRouter = Router();

userRouter.get("/me", getUserHandler);
userRouter.get(
  "/",
  adminOnly,
  paginate(User, { select: "-password" }),
  getAllUsers
);

export default userRouter;
