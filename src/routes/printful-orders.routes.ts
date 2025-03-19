import { createOrder, getOrderById, } from "../controllers/orders.controller";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Get order by ID
router.get("/:id", authenticate, getOrderById);

// Create order
router.post("/", authenticate, createOrder);

export default router;
