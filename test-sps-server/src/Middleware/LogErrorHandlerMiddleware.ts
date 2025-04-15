import { Request, Response, NextFunction } from "express";
import { logger } from "../Utils/Logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(`Erro em ${req.method} ${req.originalUrl}`);
  logger.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Erro interno no servidor",
  });
}
