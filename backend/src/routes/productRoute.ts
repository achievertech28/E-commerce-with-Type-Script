import { Router } from "express";
import ProductController from "../controlllers/productController.ts";
import upload from "../middleware/multer.ts";
import paginate from "../middleware/paginate.ts";
import Product from "../models/productModel.ts";

const productRoutes = Router();

productRoutes.post(
  "/",
  upload.array("productImages", 10),
  ProductController.createProduct
);
productRoutes.get("/", paginate(Product), ProductController.getAllProducts);
productRoutes.get("/low-stock", ProductController.getLowStockProducts);
productRoutes.get("/:id", ProductController.getProductById);
productRoutes.get(
  "/category/:category",
  ProductController.searchProductsByCategory
);
productRoutes.patch("/:id", ProductController.updateInventory);
productRoutes.patch("/:id", ProductController.updateProduct);
productRoutes.patch("/:id", ProductController.deactivateProduct);
productRoutes.delete("/:id", ProductController.permanentlyDeleteProduct);

export default productRoutes;
