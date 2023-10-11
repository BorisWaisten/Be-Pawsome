import { Suspense } from "react"
import Cargando from "./components/cargando"
import PublicacionesList from "./components/PublicacionesList"

export default function page() {
  return (
    <main>
        <nav>
          <div>
            <h2>Publicaciones</h2>
            <p><small>Estas son las publicaciones.</small></p>
          </div>
        </nav>
        <Suspense fallback={<Cargando />}>
           <PublicacionesList />
        </Suspense>
      </main>
    )
  }