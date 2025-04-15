import { ZodError } from "zod";

export function formatZodErrors(error: ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join(".");
    formatted[path] = err.message;
  });

  return formatted;
}
