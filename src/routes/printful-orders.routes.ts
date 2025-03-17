import { getOrderById, } from "../controllers/orders.controllers";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Get order by ID
router.get("/:id", authenticate, getOrderById);

export default router;
