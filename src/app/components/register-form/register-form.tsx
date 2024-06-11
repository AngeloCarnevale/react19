"use client";

import { registerUser } from "@/app/actions";
import { useActionState } from "react";

export default function RegisterForm() {
  const [result, handleRegisterUser, isPending] = useActionState(
    registerUser,
    ""
  );
  return (
    <div className="font-sans">
      <form action={handleRegisterUser}>
        <input type="text" name="name" placeholder="Digite seu nome" />

        <button type="submit">{isPending ? "Carregando..." : "Enviar"}</button>

        {result}
      </form>
    </div>
  );
}
