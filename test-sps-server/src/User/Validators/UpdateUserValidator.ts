import { z } from "zod";
import { CreateUserValidator } from "./CreateUserValidator";

export const UpdateUserValidator = CreateUserValidator.partial().extend({
  id: z.string().uuid("ID inválido, deve ser do tipo UUID"),
});
