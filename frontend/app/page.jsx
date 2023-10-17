import { Suspense } from "react"
import Cargando from "./components/cargando"
import PublicacionPage from "./components/Publicaciones/PublicacionPage"

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