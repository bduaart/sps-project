import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodErrors } from "../Utils/formatZodErrors";

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      return handleZodError(res, error);
    }
  };
}

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return handleZodError(res, error);
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      return handleZodError(res, error);
    }
  };
}

function handleZodError(res: Response, error: any) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: formatZodErrors(error),
    });
  }

  return res.status(500).json({ message: "Erro interno inesperado" });
}
