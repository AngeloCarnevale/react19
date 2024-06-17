import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.KEY);

const cookie_options = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}
//@ts-ignore
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (err) {
    return null;
  }
}
export async function createSession(userId: any) {
  const expires = new Date(Date.now() + cookie_options.duration);
  const session = await encrypt({ userId, expires });
  cookies().set(cookie_options.name, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/dashboard");
}
export async function verifySession() {
  const cookie = cookies().get(cookie_options.name)?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }

  return { userId: session.userId };
}
export async function deleteSession() {
  cookies().delete(cookie_options.name);
  redirect("/login");
}
