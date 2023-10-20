
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logoBePawsome.png";
import { obtenerUsuarioLogeado } from "../../persistencia/peticiones";
import ImgProfile from "./ImgProfile";

export default function NavBar() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const { usuario, error } = await obtenerUsuarioLogeado();
        if (usuario) {
          setUsuario(usuario);
          console.log(usuario);
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, []);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie el estado de usuario
    // Aquí puedes agregar lógica adicional si es necesario
  }, [usuario]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="py-4 px-6">
  <div className="flex items-center justify-between max-w-7xl mx-auto space-x-4 flex-wrap">
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
      <Link href="/aboutUs" className="text-black-300 hover:text-primary">
        About Us
      </Link>
      <Link href="/contactUs" className="text-black-300 hover:text-primary">
        Publicaciones
      </Link>
    </div>
    <div className="flex items-center space-x-4">
      {usuario && (
        <>
          {/* Renderizar estos enlaces solo si el usuario está presente */}
          <Link href="/publicacion" className="text-black-300 hover:text-primary">
            Crear Publicacion
          </Link>
          <ImgProfile usuario={usuario} />
        </>
      )}
      {!usuario && (
        <>
          {/* Renderizar estos enlaces solo si el usuario está presente */}
          <Link href="/login" className="text-black-300 hover:text-primary">
            Login
          </Link>
          <Link href="/registrar" className="text-black-300 hover:text-primary">
            Registrarse
          </Link>
        </>
      )}
    </div>
  </div>
</nav>
  );
}
