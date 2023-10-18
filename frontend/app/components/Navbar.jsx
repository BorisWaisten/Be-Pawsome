// components/NavBar.jsx
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logoBePawsome.png";
import { obtenerUsuarioLogeado } from "../persistencia/peticiones";

export default function NavBar() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const { usuario, error } = await obtenerUsuarioLogeado();
        if (usuario) {
          setUsuario(usuario);
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
    <nav className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-4">
        <Image
          src={Logo}
          alt="Galajo Logo"
          width={70}
          height={70}
          quality={100}
          placeholder="blur"
        />
        <Link href="/">Home </Link>
        <Link href="/aboutUs">About Us</Link>
        <Link href="/registrar">Registrarse</Link>

        {usuario && (
          <>
            {/* Renderizar estos enlaces solo si el usuario está presente */}
            <Link href="/publicacion">Crear Publicacion</Link>
            <Link href="/usuario">Ajustes de Usuario</Link>
          </>
        )}
      {!usuario && (
        <Link href="/login">Login</Link>
      )}
      </div>
    </nav>
  );
}