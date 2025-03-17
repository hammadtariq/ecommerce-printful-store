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
exports.getProductById = exports.getStoreProductById = exports.getProductsByStore = void 0;
const printful_service_1 = require("../services/printful.service");
const logger_1 = __importDefault(require("../utils/logger"));
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
const getStoreProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching product of a store by id from Printful...");
        const productId = req.params.id;
        if (!productId) {
            logger_1.default.error("Product ID is missing in request");
            throw new Error(`Product ${req.params.id} is not available`);
        }
        const storeId = req.query.store_id;
        if (!storeId) {
            throw new Error(constants_1.ERROR_MESSAGES.STORE_ID_REQUIRED);
        }
        const product = yield printful_service_1.PrintfulService.getStoreProductById(productId, storeId);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getStoreProductById = getStoreProductById;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Fetching product by id from Printful...");
        const productId = req.params.id;
        if (!productId) {
            logger_1.default.error("Product ID is missing in request");
            throw new Error(`Product ${req.params.id} is not available`);
        }
        const product = yield printful_service_1.PrintfulService.getProductById(productId);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
