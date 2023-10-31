import { Suspense } from "react"
import Cargando from "./components/cargando.jsx"
import PublicacionPage from "./components/Publicacion/PublicacionPage"

export default function page() {
  return (
      <>
        <div>
          <Suspense fallback={<Cargando/>}>
            <PublicacionPage/>
          </Suspense> 
        </div>
      </>
    )
  }