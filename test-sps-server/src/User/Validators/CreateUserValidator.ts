import { z } from "zod";
import { UserTypeEnum } from "../Enum/UserTypeEnum";

export const CreateUserValidator = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  type: z.enum([UserTypeEnum.USER, UserTypeEnum.ADMIN]),
});
