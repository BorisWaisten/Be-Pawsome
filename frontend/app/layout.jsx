import "./globals.css";
import NavBar from "./components/Navbar";
import { Roboto_Slab } from "next/font/google";
import SessionAuthProvider from "./context/SessionAuthProvider"; // Aca Van a ir todos los componentes que voy a ir importando
import Footer from "./components/Layout/Footer";
const roboto = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "BePawsome",
  description: "Adopta una vida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionAuthProvider>
          <NavBar />
          {children}
        </SessionAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
