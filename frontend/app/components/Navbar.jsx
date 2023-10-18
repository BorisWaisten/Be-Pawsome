'use client'
import Link from "next/link"
import Image from "next/image"
import Logo from "public/logoBePawsome.png"
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants"
import {Login} from "../login/logica"
import { useEffect, useState } from "react";

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
        <Link href="/register">Registrarse</Link>
        <Link href="/publicacion">Crear Publicacion</Link>
        {/*<Link href="/publicacion">Publicacion</Link>*/}
        {/*<Link href="/usuario/register">Register</Link>*/}
        {/*<Link className='' href="/register">Registrarse</Link>*/}
        if (Login.isLoggedIn()) {
          <Link href="/publicacion">Ir a Ajustes</Link>
        }
      </div>
    </nav>
  );
}
