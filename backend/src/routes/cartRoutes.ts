import { Router } from "express";
import CartController from "../controlllers/cartController.ts";
import { protect } from "../middleware/authMiddleware.ts";
// import { adminOnly } from "../middleware/authMiddleware.ts";

const cartRouter = Router();

cartRouter.post("/", protect, CartController.addProductToCart);

export default cartRouter;
