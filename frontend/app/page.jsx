import { Suspense } from "react"
import Cargando from "./components/cargando.jsx"
import PublicacionPage from "./components/Publicacion/PublicacionPage"
import BarraBuscadora from "./components/BarraBuscadora.jsx"

export default function page() {
  return (
      <>
        <div>
          <Suspense fallback={<Cargando/>}>
            <BarraBuscadora/>
            <PublicacionPage/>
          </Suspense> 
        </div>
      </>
    )
  }