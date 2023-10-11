import NavBar from './components/Navbar'
import './globals.css'
import { Roboto_Slab } from 'next/font/google'

// Aca Van a ir todos los componentes que voy a ir importando



const roboto = Roboto_Slab({ subsets: ['latin'] })


export const metadata = {
  title: 'BePawsome',
  description: 'Adopta una vida',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        {children}</body>
    </html>
  )
}
