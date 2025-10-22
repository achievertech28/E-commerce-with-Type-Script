import { Router } from "express";
import ProductController from "../controlllers/productController.ts";

const productRoutes = Router();

productRoutes.post("/", ProductController.createProduct);

export default productRoutes;
