import { Router } from "express";
import {
  createUser,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  resetPassword,
  verifyUserEmail,
  verifyResetOTP,
} from "../controlllers/authController.ts";
import { validateBody } from "../middleware/schemaValidation.ts";
import { loginSchema, registerSchema } from "../validation/authSchema.ts";

const authRouter = Router();

authRouter.post("/create-user", validateBody(registerSchema), createUser);
authRouter.post("/login", validateBody(loginSchema), loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/refresh", refreshAccessToken);
authRouter.post("/verify-email", verifyUserEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-reset-otp", verifyResetOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
