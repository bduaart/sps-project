import { Request, Response, NextFunction } from "express";
import { logger } from "../Utils/Logger";

export function logRequests(req: Request, res: Response, next: NextFunction) {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
}
