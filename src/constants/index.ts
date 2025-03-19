import { config } from "../config/env";

export const ERROR_MESSAGES = {
  STORE_ID_REQUIRED: "store_id is required",
};

export const API_ENDPOINTS = {
  PRINTFUL_BASE_URL: config.baseUrl,
};

export const ENUMS = {
  PRODUCT_STATUS: [
    "all",
    "synced",
    "unsynced",
    "ignored",
    "imported",
    "discontinued",
    "out_of_stock",
  ] as const,
};
