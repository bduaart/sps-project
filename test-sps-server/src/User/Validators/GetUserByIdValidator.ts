import { z } from "zod";

export const GetUserByIdValidator = z.object({
  id: z.string().uuid("ID inválido, deve ser do tipo UUID"),
});
