import { Router } from "express";
import {
  getCategories,
  createCategory,
} from "../controlllers/categoryController.ts";
import paginate from "../middleware/paginate.ts";
import Category from "../models/categoryModel.ts";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", paginate(Category), getCategories);

export default categoryRouter;
