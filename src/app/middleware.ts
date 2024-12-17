// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 루트 경로("/")로 접속했을 때만 리다이렉트
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 다른 경로는 그대로 진행
  return NextResponse.next();
}
