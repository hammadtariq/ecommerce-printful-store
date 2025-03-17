import { getStore } from "../controllers/stores.controller";
import { authenticate } from "../middlewares/auth";
import { Router } from "express";

const router = Router();

// Get store
router.get("/", authenticate, getStore);

export default router;
