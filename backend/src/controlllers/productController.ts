import type { Request, Response, NextFunction } from "express";
import Product from "../models/productModel.ts";
import type {
  IProduct,
  IProductFormData,
  IProductImage,
} from "../types/product.ts";
import { Types } from "mongoose";
import CloudinaryService from "../services/cloudinaryService.ts";
import Category from "../models/categoryModel.ts";

export class ProductController {
  static async getAllProducts(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).json({
        paginatedData: res.locals.paginatedResults,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single product by ID or slug
   */
  static async getProductById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      // Try to find by ID first, then by slug
      let product: IProduct | null;

      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // Valid MongoDB ObjectId
        product = await Product.findById(id).select("-__v");
      } else {
        // Assume it's a slug
        product = await Product.findOne({ slug: id }).select("-__v");
      }

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  // static async searchProductsByCategory(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const { category } = req.params;

  //     let foundCategory = null;

  //     // Check if it's a valid ObjectId or a name
  //     if (Types.ObjectId.isValid(category)) {
  //       foundCategory = await Category.findById(category);
  //     } else {
  //       foundCategory = await Category.findOne({
  //         name: { $regex: category, $options: "i" },
  //       });
  //     }

  //     if (!foundCategory) {
  //       res.status(404).json({
  //         success: false,
  //         message: `Category '${category}' not found`,
  //       });
  //       return;
  //     }

  //     const products = await Product.find({
  //       category: foundCategory._id,
  //     }).populate("category", "name");

  //     res.status(200).json({
  //       success: true,
  //       count: products.length,
  //       category: foundCategory.name,
  //       data: products,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // search produc by category
  static async searchProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryParam = req.params.category;

      // Ensure the param exists
      if (!categoryParam) {
        res.status(400).json({
          success: false,
          message: "Category parameter is required",
        });
        return;
      }

      let foundCategory = null;

      //  Check if the string looks like a valid ObjectId
      if (Types.ObjectId.isValid(categoryParam)) {
        foundCategory = await Category.findById(categoryParam);
      } else {
        foundCategory = await Category.findOne({
          name: { $regex: categoryParam, $options: "i" },
        });
      }

      if (!foundCategory) {
        res.status(404).json({
          success: false,
          message: `Category '${categoryParam}' not found`,
        });
        return;
      }

      const products = await Product.find({
        category: foundCategory._id,
      }).populate("category", "name");

      res.status(200).json({
        success: true,
        count: products.length,
        category: foundCategory.name,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { category } = req.params;
      const { sort = "-createdAt", page = "1", limit = "20" } = req.query;

      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;

      const products = await Product.find({ category, isActive: true })
        .sort(sort as string)
        .skip(skip)
        .limit(limitNum)
        .select("-__v");

      const total = await Product.countDocuments({ category, isActive: true });

      res.status(200).json({
        success: true,
        data: products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new product (Admin only)
   */
  static async createProduct(
    req: Request<{}, {}, IProductFormData>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let uploadedImages: IProductImage[] = []; // Track uploaded images for cleanup

    try {
      const {
        name,
        description,
        price,
        category,
        quantity,
        reserved,
        lowStockThreshold,
      } = req.body;

      let categoryId: Types.ObjectId;

      if (Types.ObjectId.isValid(category)) {
        categoryId = new Types.ObjectId(category as string);
      } else {
        const foundCategory = await Category.findOne({
          name: new RegExp(`^${category}$`, "i"),
        });

        if (!foundCategory) {
          res.status(400).json({
            success: false,
            message: `Category '${category}' not found. Please create it first.`,
          });
          return;
        }

        categoryId = foundCategory._id as Types.ObjectId;
      }

      // Reconstruct inventory object from flattened fields
      const inventory = {
        quantity: parseInt(quantity),
        reserved: 0,
        lowStockThreshold: parseInt(lowStockThreshold) || 10,
      };

      // Get uploaded files
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({
          success: false,
          message: "At least one product image is required",
        });
        return;
      }

      // Generate a new MongoDB ObjectId BEFORE creating the product
      const productId = new Types.ObjectId().toString();

      // Upload images to Cloudinary with the pre-generated product ID
      uploadedImages = await CloudinaryService.uploadMultipleProductImages(
        files,
        productId
      );

      // Now create the product with the images and specific ID
      const product = await Product.create({
        _id: productId,
        name,
        description,
        price,
        category: categoryId,
        inventory,
        images: uploadedImages,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      // Cleanup logic
      try {
        // 1. Delete local files (if they still exist)
        if (req.files) {
          const files = req.files as Express.Multer.File[];
          files.forEach((file) => {
            CloudinaryService.deleteLocalFile(file.path);
          });
        }

        // 2. Delete uploaded images from Cloudinary (if upload succeeded)
        if (uploadedImages.length > 0) {
          const publicIds = uploadedImages.map((img) => img.public_id);
          await CloudinaryService.deleteMultipleImages(publicIds);
          console.log(`Cleaned up ${publicIds.length} images from Cloudinary`);
        }
      } catch (cleanupError) {
        // Log cleanup errors but don't throw them
        console.error("Error during cleanup:", cleanupError);
      }

      next(error);
    } finally {
      // Always attempt to delete local files
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        files.forEach((file) => {
          CloudinaryService.deleteLocalFile(file.path);
        });
      }
    }
  }

  /**
   * Update product (Admin only)
   */
  static async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Don't allow direct inventory updates through this endpoint
      if (updates.inventory) {
        res.status(400).json({
          success: false,
          message: "Use the inventory update endpoint to modify stock",
        });
        return;
      }

      const product = await Product.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select("-__v");

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update product inventory (Admin only)
   */
  static async updateInventory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity, lowStockThreshold } = req.body;

      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      // Update inventory fields
      if (quantity !== undefined) {
        if (quantity < product.inventory.reserved) {
          res.status(400).json({
            success: false,
            message: `Cannot set quantity below reserved amount (${product.inventory.reserved})`,
          });
          return;
        }
        product.inventory.quantity = quantity;
      }

      if (lowStockThreshold !== undefined) {
        product.inventory.lowStockThreshold = lowStockThreshold;
      }

      await product.save();

      res.status(200).json({
        success: true,
        message: "Inventory updated successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * deactivateproduct product (soft delete - set isActive to false)
   */
  static async deactivateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Permanently delete product (Hard delete - Admin only)
   */
  static async permanentlyDeleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      // Check if product has reserved inventory (orders in progress)
      if (product.inventory.reserved > 0) {
        res.status(400).json({
          success: false,
          message:
            "Cannot delete product with reserved inventory. Cancel pending orders first.",
        });
        return;
      }

      await Product.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Product permanently deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get low stock products (Admin only)
   */
  static async getLowStockProducts(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await Product.findLowStock();

      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Check product stock availability
   */
  static async checkStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.query;

      const product = await Product.findById(id);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
        return;
      }

      const requestedQty = quantity ? parseInt(quantity as string, 10) : 1;
      const isAvailable = product.hasSufficientStock(requestedQty);

      res.status(200).json({
        success: true,
        data: {
          productId: product._id,
          productName: product.name,
          requestedQuantity: requestedQty,
          availableStock: product.availableQuantity,
          isAvailable,
          isLowStock: product.isLowStock,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
