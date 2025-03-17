import { Request, Response, NextFunction } from "express";
import { PrintfulService } from "../services/printful.service";
import { ERROR_MESSAGES } from "../constants";

export const getStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Fetching store by id from Printful...");
      const storeId = req.query.store_id as string| undefined;
      if (!storeId) {
        throw new Error(ERROR_MESSAGES.STORE_ID_REQUIRED);
      }
      const storeInfo = await PrintfulService.getStoreInfo(storeId);
      res.status(200).json(storeInfo);
    } catch (error) {
      next(error);
    }
  };
  