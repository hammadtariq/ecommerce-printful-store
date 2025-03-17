"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printfulClient = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("./env");
const constants_1 = require("../constants");
exports.printfulClient = axios_1.default.create({
    baseURL: constants_1.API_ENDPOINTS.PRINTFUL_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env_1.config.printfulApiKey}`,
    },
});
