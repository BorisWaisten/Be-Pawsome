"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/logoBePawsome.png";

export default function Navbar() {
  const { data: session, status } = useSession();
  //console.log({ session });

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  if (session) {
    return (
      <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5">
        <div className="ml-auto flex gap-2">
          <>
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
          </>
        </div>
      </div>
    );
  }
  return (
    <>
      No esta Logueado <br />
      <button onClick={() => signIn()} className="btn btn-primary">
        Loguearse
      </button>
    </>
  );
}
