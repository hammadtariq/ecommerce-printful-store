import { getProductById, getProductsByStore, getStoreProductById, getStoreProductMockupById, syncProduct } from "../controllers/products.controller";
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
// Get store product placement by ID
router.get("/store/mockup/:id", authenticate, getStoreProductMockupById);

export default router;
