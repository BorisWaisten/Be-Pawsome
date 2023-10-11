import Link from "next/link"
import Image from "next/image"
import Logo from "public/logoBePawsome.png"
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants"

export default function NavBar() {
  return (
    <nav>
        <Image
            src={Logo} 
            alt='Galajo Logo'
            width={70}
            height={70}
            quality={100}
            placeholder="blur"
        />
        <Link href="/"> Home </Link>
        <Link href="/login">Publicaciones</Link>
        <Link href="/aboutUs">About Us</Link>
{/*     <Link href="/usuario/register">Register</Link>*/}
        <Link className='' href="/register">Registrarse</Link>
      
    </nav>
   )
}

