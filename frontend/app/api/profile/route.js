import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();
  const data = cookieStore.get("myTokenName");

  if (!data) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const {mail, password} = jwt.verify(data.accesToken, "secretkey123");

  return NextResponse.json({
    mail,
    password,
  });
}