import { z } from "zod";

export const DeleteUserValidator = z.object({
  id: z.string().uuid("ID inválido, deve ser do tipo UUID"),
});
