"use server";

import { SignUpFormSchema } from "@/app/_lib/definitions";
import { prisma } from "@/app/_lib/prisma";
import { createSession } from "@/app/_lib/session";
import bcrypt from "bcryptjs";

export async function signup(_: unknown, formData: FormData) {
  const validationResult = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, name, password } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 12);

  const data = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  if (data) await createSession(email);
}
