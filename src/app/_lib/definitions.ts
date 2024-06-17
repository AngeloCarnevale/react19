import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long."}),
  email: z.string().email({message: "Please enter a valid email "}),
  password: z.string().min(6, { message: "Senha muito curta" }),
});
