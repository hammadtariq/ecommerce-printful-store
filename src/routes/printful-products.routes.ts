import { getProductById, getProductsByStore } from "../controllers/products.controller";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Get all products by store
router.get("/", authenticate, getProductsByStore);
// Get product by ID
router.get("/:id", authenticate, getProductById);

export default router;
