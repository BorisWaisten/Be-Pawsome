"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "public/logoBePawsome.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

 return (
    <nav className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-4">
        <Link href="/"  onClick={() =>{router.push("/");router.reload()}}>
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
        {session && (
          <Link href="/publicacion/crearPublicacion">Crear Publicacion</Link>
          )}
      </div>

      <div className="ml-auto flex space-x-2"> {/* Agregado un contenedor flex */}
        {session ? (
          <button onClick={toggleMenu} className="cursor-pointer focus:outline-none">
            <Image
              src={session.user?.userLogueado.imagenPerfil}
              alt="Imagen Usuario"
              width={50}
              height={50}
              quality={100}
              className="rounded-full"
            />
          </button>
        ) : (
          <div className="flex space-x-2 " > {/* Agregado un contenedor flex */}
            <button onClick={() => router.push('/register')} className="btn btn-primary">
              Registrarse
            </button>
            <button onClick={() => signIn()} className="btn btn-primary">
              Loguearse
            </button>
          </div>
        )}
      </div>
      {menuVisible && session && (
      <div className="absolute top-16 right-6 bg-white p-4 rounded shadow flex flex-col" style={{ position: "absolute", marginTop: "60px" }}>
        <Link href="/usuario/casita">Casita</Link>
        <Link href="/usuario/misPublicaciones">Mis Publicaciones</Link>
        <Link href="/usuario/perfil">Perfil</Link>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </div>
    )}
    </nav>
  );
}