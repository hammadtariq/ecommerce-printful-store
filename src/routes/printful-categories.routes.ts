import { getCategoryById, getProductCategories } from "../controllers/categories.controller";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Get all product categories
router.get("/", authenticate, getProductCategories);
// Get category by id
router.get("/:id", authenticate, getCategoryById);

export default router;
