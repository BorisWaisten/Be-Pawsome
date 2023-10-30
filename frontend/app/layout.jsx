import NavBar from "./components/layout/Navbar";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import Footer from "./components/layout/Footer";
import { SessionAuthProvider } from "next-auth/react";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "BePawsome",
  description: "Adopta una vida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
