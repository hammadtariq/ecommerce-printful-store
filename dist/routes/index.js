"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printful_products_routes_1 = __importDefault(require("./printful-products.routes"));
const printful_stores_routes_1 = __importDefault(require("./printful-stores.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/store", printful_stores_routes_1.default);
router.use("/products", printful_products_routes_1.default);
exports.default = router;
