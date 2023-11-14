import { Suspense } from "react"
<<<<<<< HEAD
import Cargando from "./components/cargando.jsx"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PublicacionesList from "./components/Publicaciones/PublicacionesList.jsx";
=======
import Cargando from "./components/cargando"
import PublicacionPage from "./components/Publicaciones/PublicacionPage"
>>>>>>> origin/boris

export default function page() {
  return (
    <>
     
        <div>
<<<<<<< HEAD
          <Suspense fallback={<Cargando />}>
            <PublicacionesList />
          </Suspense>
=======
          <Suspense fallback={<Cargando/>}>
            <PublicacionPage/>
          </Suspense> 
>>>>>>> origin/boris
        </div>
     
    </>
  );
}
