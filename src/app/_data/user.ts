import { cache } from "react";
import { prisma } from "../_lib/prisma";
import { verifySession } from "../_lib/session";

export const getUser = cache(async () => {
  const session = await verifySession();

  const data = await prisma.user.findMany({
    where: { email: session.userId },
    select: { email: true, name: true },
  });

  const user = data[0];

  return user;
});

function userDTO(user: any) {
  return {
    name: user.name,
    email: user.email,
  };
}

