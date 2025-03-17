"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_controller_1 = require("../controllers/products.controller");
const auth_1 = require("../middlewares/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Get all products by store
router.get("/", auth_1.authenticate, products_controller_1.getProductsByStore);
// Get product by ID
router.get("/:id", auth_1.authenticate, products_controller_1.getProductById);
// Get store product by ID
router.get("/store/:id", auth_1.authenticate, products_controller_1.getStoreProductById);
exports.default = router;
