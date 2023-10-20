"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const ImgProfile = ({ usuario }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <div className=" flex relative ml-auto">
      <button
        className="p-2 rounded-sm m-1 ml-auto"
        onClick={handleMenuClick}
      >
        <Image
          src={usuario.imagenPerfil}
          alt="imagen perfil"
          width={50}
          height={50}
          quality={100}
        />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <Link legacyBehavior href="/usuario">
              <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                Mi perfil
              </a>
            </Link>
            <Link legacyBehavior href="/">
              <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                Casita de adopciones
              </a>
            </Link>
            <Link legacyBehavior href="/usuario/mispublicaciones">
              <a className="block px-4 py-2 text-gray-800 hover:bg-violet-100 transition duration-300 ease-in-out">
                Mis publicaciones
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default ImgProfile;
