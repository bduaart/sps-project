import { z } from "zod";

export const GetUserValidator = z.object({
  page: z.coerce
    .number()
    .int("A página deve ser um número inteiro")
    .positive("A página deve ser maior que 0")
    .default(1),

  pageSize: z.coerce
    .number()
    .int("O tamanho da página deve ser um número inteiro")
    .positive("O tamanho da página deve ser maior que 0")
    .max(500, "O tamanho máximo permitido por página é 500")
    .default(50),
});
