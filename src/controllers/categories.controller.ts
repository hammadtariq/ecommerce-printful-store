import { Request, Response, NextFunction } from "express";
import { PrintfulService } from "../services/printful.service";
import logger from "../utils/logger";

export const getProductCategories = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("Fetching catalog categories available in the printful...");
      const categories = await PrintfulService.getProductCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

export const getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("Fetching category by id in the printful...");
      const id = req.params.id;
    if (!id) {
      logger.error("Category ID is missing in request");
      throw new Error(`Product ${req.params.id} is not available`);
    }
      const categories = await PrintfulService.getCategoryById(id);
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };