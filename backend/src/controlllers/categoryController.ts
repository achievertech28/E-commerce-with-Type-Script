import type { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel.ts";
import Product from "../models/productModel.ts";

// get all categories
export const getCategories = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      paginatedData: res.locals.paginatedResults,
    });
  } catch (error) {
    next(error);
  }
};

// create category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: "Category name is required",
      });
      return;
    }

    const categoryExisting = await Category.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });
    if (categoryExisting) {
      res.status(400).json({
        success: false,
        message: `Category '${name}' already exists`,
      });
      return;
    }

    const newCategory = await Category.create({ name, description });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};
