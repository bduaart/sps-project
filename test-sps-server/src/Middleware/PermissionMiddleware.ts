import { Request, Response, NextFunction } from "express";
import { permissions, Resource, Action } from "../Config/Permissions";

export function checkAccess(resource: Resource, action: Action) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const rolePermissions = permissions[user.type];
    if (!rolePermissions || !rolePermissions[resource]?.includes(action)) {
      return res.status(403).json({ error: "Acesso negado: sem permissão" });
    }

    next();
  };
}
