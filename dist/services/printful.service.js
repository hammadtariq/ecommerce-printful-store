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
exports.PrintfulService = void 0;
const printful_1 = require("../config/printful");
const common_1 = require("../utils/common");
const logger_1 = __importDefault(require("../utils/logger"));
class PrintfulService {
    /**
     * Get all products from Printful store.
     */
    static getProductsByStore(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("Fetching products by store from Printful...", { storeId });
                const response = yield printful_1.printfulClient.get(`/store/products`, {
                    params: { store_id: storeId },
                });
                logger_1.default.info("Products fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch products from Printful");
            }
        });
    }
    /**
     * Get details of a specific product.
     */
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info(`Fetching details for product ID: ${productId}`);
                const response = yield printful_1.printfulClient.get(`/products/${productId}`);
                logger_1.default.info("Product details fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch product details from Printful");
            }
        });
    }
    /**
     * Get details of a specific product in a store.
     */
    static getStoreProductById(productId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info(`Fetching store product details for ID: ${productId}`);
                const response = yield printful_1.printfulClient.get(`/store/products/${productId}`, {
                    params: { store_id: storeId },
                });
                logger_1.default.info("Store product details fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch store product details from Printful");
            }
        });
    }
    /**
     * Get Printful store information.
     */
    static getStoreInfo(storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("Fetching store information...", { storeId });
                const response = yield printful_1.printfulClient.get(`/store`, {
                    params: { store_id: storeId },
                });
                logger_1.default.info("Store information fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch store information from Printful");
            }
        });
    }
    /**
     * Get details of a specific order.
     */
    static getOrderById(orderId, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info(`Fetching details for order ID: ${orderId}`);
                const response = yield printful_1.printfulClient.get(`/orders/${orderId}`, {
                    params: { store_id: storeId },
                });
                logger_1.default.info("Order details fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch order details from Printful");
            }
        });
    }
    /**
     * Get tracking details for an order.
     */
    static getOrderTracking(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info(`Fetching tracking details for order ID: ${orderId}`);
                const response = yield printful_1.printfulClient.get(`/orders/${orderId}/tracking`);
                logger_1.default.info("Order tracking fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch tracking information from Printful");
            }
        });
    }
    /**
     * Create a new order.
     */
    static createOrder(orderData_1, storeId_1) {
        return __awaiter(this, arguments, void 0, function* (orderData, storeId, isConfirmed = false) {
            var _a;
            try {
                const transFormOrder = (0, common_1.transformToSnakeCase)(orderData);
                logger_1.default.info("Creating new order...", { orderData });
                const response = yield printful_1.printfulClient.post("/orders", transFormOrder, {
                    headers: { "X-PF-Store-Id": storeId },
                    params: { confirm: isConfirmed },
                });
                logger_1.default.info("Order created successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to create order in Printful");
            }
        });
    }
    /**
     * Get shipping rates for an order.
     */
    static getShippingRates(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { recipient, items } = params;
                logger_1.default.info("Fetching shipping rates...", { recipient, items });
                const response = yield printful_1.printfulClient.post(`/shipping/rates`, {
                    recipient,
                    items,
                });
                logger_1.default.info("Shipping rates fetched successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to fetch shipping rates from Printful");
            }
        });
    }
    /**
     * Sync new products with Printful store.
     */
    static syncProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("Syncing new product with Printful...", { productData });
                const response = yield printful_1.printfulClient.post(`/store/products`, productData);
                logger_1.default.info("Product synced successfully");
                return response.data;
            }
            catch (error) {
                logger_1.default.error("Printful API Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Failed to sync product with Printful");
            }
        });
    }
}
exports.PrintfulService = PrintfulService;
