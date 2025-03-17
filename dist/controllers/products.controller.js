"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingRates = exports.getOrderTracking = exports.getOrderById = exports.getProductById = exports.getProductsByStore = void 0;
const printful_service_1 = require("../services/printful.service");
const logger_1 = __importDefault(require("../utils/logger"));
const safeJsonParse_1 = require("../utils/safeJsonParse");
const constants_1 = require("../constants");
const getProductsByStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching products from Printful...");
        const storeId = req.query.store_id;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        const products = yield printful_service_1.PrintfulService.getProductsByStore(storeId);
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductsByStore = getProductsByStore;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching product by id from Printful...");
        const productId = req.params.id;
        if (!productId) {
            logger_1.default.error("Product ID is missing in request");
            throw new Error(`Product ${req.params.id} is not available`);
        }
        const storeId = req.query.store_id;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        const product = yield printful_service_1.PrintfulService.getProductById(productId, storeId);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching order by id from Printful...");
        const orderId = req.params.id;
        if (!orderId) {
            logger_1.default.error("Order ID is missing in request");
            throw new Error(`Order ${req.params.id} is not available`);
        }
        const storeId = req.query.store_id;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        const product = yield printful_service_1.PrintfulService.getOrderById(orderId, storeId);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const getOrderTracking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching tracking details of order by id from Printful...");
        const orderId = req.params.id;
        if (!orderId) {
            logger_1.default.error("Order ID is missing in request");
            throw new Error(`Order ${req.params.id} is not available`);
        }
        const storeId = req.query.store_id;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        const product = yield printful_service_1.PrintfulService.getOrderTracking(orderId, storeId);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderTracking = getOrderTracking;
const getShippingRates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching shipping rates...");
        const countryCode = req.query.countryCode;
        const itemsString = req.query.items;
        const storeId = req.query.storeId;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        if (!countryCode) {
            throw new Error(`country_code is required`);
        }
        if (!itemsString) {
            throw new Error(`items is required`);
        }
        // Safely parse `items` (default to an empty array if parsing fails)
        const items = (0, safeJsonParse_1.safeJsonParse)(itemsString, []);
        // Validate that all items have the required properties
        if (!Array.isArray(items) ||
            items.length === 0 ||
            !items.every((item) => typeof item.variant_id === "number" &&
                typeof item.quantity === "number")) {
            throw new Error(`Invalid items format. Expected an array of objects with 'variant_id' and 'quantity' properties`);
        }
        const recipient = {
            country_code: countryCode,
        };
        const request = { recipient, items, store_id: storeId };
        const product = yield printful_service_1.PrintfulService.getShippingRates(request);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getShippingRates = getShippingRates;
