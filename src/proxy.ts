import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type SecurityEvent =
  | "admin_disabled_probe"
  | "admin_auth_missing"
  | "admin_auth_malformed"
  | "admin_auth_invalid";

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

function logSecurityEvent(request: NextRequest, event: SecurityEvent) {
  // Intentionally exclude IP addresses, query strings, cookies and Authorization
  // headers. Vercel timestamps the runtime log entry; this payload only records
  // enough information to identify repeated probes or authentication failures.
  console.warn(
    JSON.stringify({
      type: "security",
      event,
      method: request.method,
      path: request.nextUrl.pathname.slice(0, 160),
    }),
  );
}

function unauthorized(request: NextRequest, event: SecurityEvent) {
  logSecurityEvent(request, event);

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Archie Portfolio Admin", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  const adminEnabled = process.env.ENABLE_ADMIN === "true";
  const adminUsername = process.env.ADMIN_USERNAME ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  // Fail closed: the private utility is unavailable unless it has deliberately
  // been enabled and both server-only credentials are configured.
  if (!adminEnabled || !adminUsername || !adminPassword) {
    logSecurityEvent(request, "admin_disabled_probe");
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorized(request, "admin_auth_missing");
  }

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) return unauthorized(request, "admin_auth_malformed");

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    if (!safeEqual(username, adminUsername) || !safeEqual(password, adminPassword)) {
      return unauthorized(request, "admin_auth_invalid");
    }
  } catch {
    return unauthorized(request, "admin_auth_malformed");
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
