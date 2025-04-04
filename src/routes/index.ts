import categoriesRoutes from "./printful-categories.routes";
import productRoutes from "./printful-products.routes";
import storeRoutes from "./printful-stores.routes";
import orderRoutes from "./printful-orders.routes";
import { Router } from "express";
import { proxyImageMiddleware } from "../middlewares/proxy";

const router = Router();
router.use("/store", storeRoutes);
router.use("/order", orderRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoriesRoutes);
router.get("/proxy", proxyImageMiddleware);
export default router;
