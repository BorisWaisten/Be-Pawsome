"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/logoBePawsome.png";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex items-center justify-between py-4 px-6">
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
        <Link href="/aboutUs">About Us</Link>
        <Link href="/restringida">Retringida</Link>
      </div>
      {session ? (
        <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5">
          <div className="ml-auto flex gap-2">
            Bienvenido {session.user?.userLogueado.nombre} <br />
            <Image
              src={session.user?.userLogueado.imagenPerfil}
              alt="Imagen Usuario"
              width={50}
              height={50}
              quality={100}
            />
            <button onClick={() => signOut()} className="btn btn-danger">
              Salir
            </button>
          </div>
        </div>
      ) : (
        <div>
          No está Logueado <br />
          <button onClick={() => signIn()} className="btn btn-primary">
            Loguearse
          </button>
        </div>
      )}
    </nav>
  );
}
