"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/logoBePawsome.png";
import SessionAuthProvider from "@/app/context/SessionAuthProvider";
import ImgProfile from "./ImgProfile";

export default function Navbar() {
  const { data: session, status } = useSession();
 

  return (
    <SessionAuthProvider>
      <nav className="flex items-center  py-4 px-6  mb-4  max-w-screen-xl">
        <div className="flex items-center space-x-4 justify-end">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo BePawsome"
              width={70}
              height={70}
              quality={100}
              placeholder="blur"
            />
          </Link>
          <Link
            href="/aboutUs"
            className="hover:text-purple-500 hover:underline"
          >
            About Us
          </Link>

          {session && (
            <>
              {/* Renderizar estos enlaces solo si el usuario está presente */}
              <Link
                href="/publicacion"
                className="hover:text-purple-500 hover:underline"
              >
                Crear Publicacion
              </Link>
              <ImgProfile />
            </>
          )}
          {!session && (
            <>
              <div className="flex justify-end">
                {/* Renderizar estos enlaces solo si el usuario está presente */}
                <button
                  onClick={() => signIn()}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Login
                </button>
                <button
                  href="/registrar"
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Registrarse
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </SessionAuthProvider>
  );
}
