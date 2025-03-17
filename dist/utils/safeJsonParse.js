"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJsonParse = void 0;
const logger_1 = __importDefault(require("./logger"));
/**
 * Safely parses a JSON string.
 * @param jsonString The stringified JSON input
 * @param fallback The fallback value in case of an error (default: empty array)
 * @returns Parsed JSON object or fallback value
 */
const safeJsonParse = (jsonString, fallback) => {
    try {
        if (!jsonString) {
            logger_1.default.warn("safeJsonParse: Received undefined or empty string");
            return fallback;
        }
        return JSON.parse(jsonString);
    }
    catch (error) {
        logger_1.default.error(`safeJsonParse: Failed to parse JSON - ${error}`);
        return fallback;
    }
};
exports.safeJsonParse = safeJsonParse;
