import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    email: string;
    type: string;
  };
};

export function authMiddleware(secret: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secret) as {
        sub: string;
        email: string;
        type: string;
      };

      req.user = {
        id: decoded.sub,
        email: decoded.email,
        type: decoded.type,
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  };
}
