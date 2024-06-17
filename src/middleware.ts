// import { cookies } from "next/headers";
// import { NextResponse, type NextRequest } from "next/server";
// import { decrypt } from "./app/_lib/session";

// export default async function middleware(req: NextRequest) {
//   const protectedRoutes = ["/dashboard"];
//   const currentPath = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(currentPath);

//   if (isProtectedRoute) {
//     const cookie = cookies().get("session")?.value;
//     const session = await decrypt(cookie);
//     console.log(session)
//     if (!session?.userId) {
//       return NextResponse.redirect(new URL("/login", req.nextUrl));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
// };

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/_lib/session";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const cookie = cookies().get("session")?.value;

  const { pathname } = request.nextUrl;
  const siginInURL = new URL("/auth/signin", request.url);
  // const session = undefined;
  if (cookie === undefined) {
    if (request.nextUrl.pathname == "/auth/signin") {
      return NextResponse.next();
    }

    return NextResponse.redirect(siginInURL);
  }

  if (cookie && pathname.startsWith("/auth/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return res;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
