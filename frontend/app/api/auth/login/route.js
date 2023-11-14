import { login } from "@/app/persistencia/peticiones";
import { NextResponse } from "next/server";


export async function POST(request){
    const body = await request.json();

    const data = await login(body);

    if (data) {
        
        const response = NextResponse.json('login route');

        response.cookies.set("myTokenName", data.accesToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "production",
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
          });
        return response
    }else{
        return NextResponse.json(
            {
              message: "Invalid credentials",
            },
            {
              status: 401,
            }
          );
    }
}