import { Request, Response, NextFunction } from "express";
import { PrintfulService } from "../services/printful.service";
import logger from "../utils/logger";
import { safeJsonParse, transformToSnakeCase } from "../utils/common";
import { ERROR_MESSAGES } from "../constants";
import { CreateOrderRequest, Item, ShippingRatesRequest } from "../types/products";

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Fetching order by id from Printful...");
    const orderId = req.params.id;
    if (!orderId) {
      logger.error("Order ID is missing in request");
      throw new Error(`Order ${req.params.id} is not available`);
    }
    const storeId = req.query.store_id as string | undefined;
    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }
    const product = await PrintfulService.getOrderById(orderId, storeId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getOrderTracking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Fetching tracking details of order by id from Printful...");
    const orderId = req.params.id;
    if (!orderId) {
      logger.error("Order ID is missing in request");
      throw new Error(`Order ${req.params.id} is not available`);
    }
    const storeId = req.query.store_id as string | undefined;
    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }
    const product = await PrintfulService.getOrderTracking(orderId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getShippingRates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Fetching shipping rates...");

    const countryCode = req.query.countryCode as string | undefined;
    const itemsString = req.query.items as string | undefined;
    const storeId = req.query.storeId as string | undefined;

    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }
    if (!countryCode) {
      throw new Error(`country_code is required`);
    }
    if (!itemsString) {
      throw new Error(`items is required`);
    }

    // Safely parse `items` (default to an empty array if parsing fails)
    const items = safeJsonParse<Item[]>(itemsString, []);

    // Validate that all items have the required properties
    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !items.every(
        (item) =>
          typeof item.variantId === "number" &&
          typeof item.quantity === "number"
      )
    ) {
      throw new Error(
        `Invalid items format. Expected an array of objects with 'variant_id' and 'quantity' properties`
      );
    }

    const recipient = {
      country_code: countryCode,
    };

    const request: ShippingRatesRequest = { recipient,items,storeId };
    const product = await PrintfulService.getShippingRates(request);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Creating a new order in Printful...");

    const storeId = req.headers["x-pf-store-id"] as string | undefined;
    const isConfirmed = req.query.isConfirmed  as boolean | undefined;
    const orderData = req.body;
    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }

    const newOrder = await PrintfulService.createOrder(orderData, storeId, isConfirmed);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
