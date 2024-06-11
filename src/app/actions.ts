"use server";

import { z } from "zod";

const registerUserSchema = z.object({
  name: z.string().min(6, { message: "Nome muito curto" }),
});
export async function registerUser(_: unknown, data: FormData) {
  const result = registerUserSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    return result.error.flatten().fieldErrors?.name;
  }

  const { name } = result.data;
  return `Hello ${name}`;
}
