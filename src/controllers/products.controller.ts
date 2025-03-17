import { Request, Response, NextFunction } from "express";
import { PrintfulService } from "../services/printful.service";
import logger from "../utils/logger";
import { ERROR_MESSAGES } from "../constants";

export const getProductsByStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Fetching products from Printful...");

    const storeId = req.query.store_id as string | undefined;

    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }
    const products = await PrintfulService.getProductsByStore(storeId);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Fetching product by id from Printful...");
    const productId = req.params.id;
    if (!productId) {
      logger.error("Product ID is missing in request");
      throw new Error(`Product ${req.params.id} is not available`);
    }
    const storeId = req.query.store_id as string | undefined;
    if (!storeId) {
      throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
    }
    const product = await PrintfulService.getProductById(productId, storeId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};