import productRoutes from "./printful-products.routes";
import storeRoutes from "./printful-stores.routes";
import orderRoutes from "./printful-orders.routes";
import { Router } from "express";

const router = Router();
router.use("/store", storeRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);

export default router;
