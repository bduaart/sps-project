import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha obrigatória"),
  type: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Tipo inválido (admin ou user)" }),
  }),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
