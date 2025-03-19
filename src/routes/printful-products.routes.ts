import { getProductById, getProductsByStore, getStoreProductById, syncProduct } from "../controllers/products.controller";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Post and sync product
router.post("/", authenticate, syncProduct);
// Get all products by store
router.get("/", authenticate, getProductsByStore);
// Get product by ID
router.get("/:id", authenticate, getProductById);
// Get store product by ID
router.get("/store/:id", authenticate, getStoreProductById);

export default router;
