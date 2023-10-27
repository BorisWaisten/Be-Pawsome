"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logoBePawsome.png";
import { obtenerUsuarioLogeado } from "../../persistencia/peticiones";
import ImgProfile from "./ImgProfile";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NavBar(token) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const profile = await axios.get("/api/profile");
        console.log(profile.data);
        setUsuario(profile.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuario();
  }, [])
  
if (loading) {
    return <div>Cargando...</div>;
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

        {usuario && (
          <>
            {/* Renderizar estos enlaces solo si el usuario está presente */}
            <Link href="/publicacion">Crear Publicacion</Link>
            <ImgProfile usuario={usuario} />
          </>
        )}
        {!usuario && (
          <>
            {/* Renderizar estos enlaces solo si el usuario está presente */}
            <Link href="/login">Login</Link>
            <Link href="/registrar">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
