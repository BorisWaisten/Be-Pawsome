export { default } from "next-auth/middleware"



export const config = { matcher: [
    "/usuario/:path*",
    "/publicacion/:path*",
    "/sigIn/cambiarContrasenia",
  ] }