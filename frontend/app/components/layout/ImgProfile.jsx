"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const ImgProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      <div className=" flex relative">
        <button
          className="p-2 rounded-sm m-1 "
          onClick={handleMenuClick}
        >
          <Image
            src={session.user?.userLogueado.imagenPerfil}
            alt="imagen perfil"
            width={50}
            height={50}
            quality={100}
          />
          <p>Bienvenido {session.user?.userLogueado.nombre}</p>
        </button>
        
        {menuOpen && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
              <Link legacyBehavior href="/usuario/perfil">
                <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                  Mi perfil
                </a>
              </Link>
              <Link legacyBehavior href={"/usuario/casita"}>
                <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                  Casita de adopciones
                </a>
              </Link>
              <Link legacyBehavior href="/usuario/mispublicaciones">
                <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                  Mis publicaciones
                </a>
              </Link>
              <button onClick={() => signOut()} legacyBehavior className="px-4 py-2 w-full text-m text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                Salir de la cuenta
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImgProfile;
