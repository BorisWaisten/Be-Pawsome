import { Suspense } from "react"
import Cargando from "./components/cargando"
import PublicacionesList from "./components/publicaciones/PublicacionesList"

export default function page() {
  return (
      <>
          <div>
            <h2>Publicaciones</h2>
          </div> 
        <div>
          <PublicacionPage/>
        </div>
      </>
    )
  }