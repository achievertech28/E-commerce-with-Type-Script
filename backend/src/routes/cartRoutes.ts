import { Router } from "express";
import CartController from "../controlllers/cartController.ts";
import { protect } from "../middleware/authMiddleware.ts";
// import { adminOnly } from "../middleware/authMiddleware.ts";

const cartRouter = Router();

cartRouter.post("/add", protect, CartController.addProductToCart);
cartRouter.get("/", CartController.getCart);
cartRouter.post(
  "/increaseQuantity",
  protect,
  CartController.increaseProductQuantity
);
cartRouter.post(
  "/decreaseQuantity",
  protect,
  CartController.decreaseProductQuantity
);
cartRouter.delete(
  "/removeProduct/:productId",
  protect,
  CartController.removeFromCart
);
cartRouter.delete("/clear", protect, CartController.clearCart);
cartRouter.get("/getcartsummary", protect, CartController.getCartSummary);

export default cartRouter;
