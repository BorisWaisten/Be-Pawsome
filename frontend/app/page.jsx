import { Suspense } from "react";
import Cargando from "./components/cargando";
import PublicacionPage from "./components/Publicaciones/PublicacionPage";
import SessionAuthProvider from "./context/SessionAuthProvider";
import Navbar from "./components/layout/Navbar";

export default function page() {
  return (
    <>
      <SessionAuthProvider>
        <Navbar/>
        <div>
          <Suspense fallback={<Cargando />}>
            <PublicacionPage />
          </Suspense>
        </div>
      </SessionAuthProvider>
    </>
  );
}
