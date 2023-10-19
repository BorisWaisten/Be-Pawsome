import NavBar from "./components/layout/Navbar";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import Footer from "./components/layout/Footer";
// Aca Van a ir todos los componentes que voy a ir importando

const roboto = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "BePawsome",
  description: "Adopta una vida",
};

export default function RootLayout({ children }) {

 

  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
      
    </html>
  );
}
