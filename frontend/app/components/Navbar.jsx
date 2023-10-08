import Link from "next/link"
import Image from "next/image"
import Logo from "./galajoLogoMini.png"
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
        <h1> BEPAWESOME</h1>
        <Link href="/"> Home </Link>
        <Link href="/aboutUs">About Us</Link>
        <Link href="/usuario">Usuario</Link>
    </nav>
   )
}