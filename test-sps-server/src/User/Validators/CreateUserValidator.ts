import { z } from "zod";
import { UserTypeEnum } from "../Enum/UserTypeEnum";

export const CreateUserValidator = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha é obrigatório"),
  type: z.enum([UserTypeEnum.USER, UserTypeEnum.ADMIN]),
});
