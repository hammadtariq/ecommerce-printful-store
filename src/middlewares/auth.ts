import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers.authorization;

  if (!apiKey || apiKey !== `Bearer ${config.printfulApiKey}`) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
