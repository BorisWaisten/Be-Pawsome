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
      <nav className="flex items-center justify-between px-6 py-4 mx-5 mb-3 max-w-full">
        <div className="flex items-center space-x-4">
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
            <Link
              href="/publicacion"
              className="hover:text-purple-500 hover:underline"
            >
              Crear Publicacion
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <ImgProfile />
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              <button
                href="/registrar"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </nav>
    </SessionAuthProvider>
  );
}
