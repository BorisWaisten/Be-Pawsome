"use client"
import { Suspense } from "react"
import Cargando from "./components/cargando.jsx"
import PublicacionPage from "./components/Publicacion/PublicacionPage"
import BarraBuscadora from "./components/BarraBuscadora.jsx"
import { useState } from "react"

export default function page() {
  const [publicaciones, setPublicaciones] = useState([]);

  return (
      <>
        <div>
          <Suspense fallback={<Cargando/>}>
            <BarraBuscadora getPublicaciones={(publicaciones)=>setPublicaciones(publicaciones)}/>
            <PublicacionPage publicaciones={publicaciones}/>
          </Suspense> 
        </div>
      </>
    )
  }