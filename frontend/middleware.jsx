export { default } from "next-auth/middleware"

export const config = { matcher: [
    "/restringida",
    "/usuario/:path*",
    "/publicacion",
  ] }