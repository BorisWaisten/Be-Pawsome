import { Suspense } from "react"
import Cargando from "./components/cargando"
import PublicacionPage from "./components/Publicaciones/PublicacionPage"
import LoginPage from "./login/page"

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