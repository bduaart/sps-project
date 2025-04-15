import { z } from "zod";

export const LoginValidator = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});
