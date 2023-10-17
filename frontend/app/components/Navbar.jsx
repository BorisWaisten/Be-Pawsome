import Link from "next/link"
import Image from "next/image"
import Logo from "public/logoBePawsome.png"
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants"
import {Login} from "../login/logica"


export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-4">
        <Image
          src={Logo} 
          alt='Galajo Logo'
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
      </div>
      <Link href="/login">Login</Link>
    </nav>
  )
}

