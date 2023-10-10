import Link from "next/link"
export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl"> Hubo un problema! </h2>
      <p> No pudimos encontrar la pagina que estabas buscando.</p>
      <p> Para volver a la pagina principal, <Link href="/"> Haga Click.</Link> </p>
    </main>
  )
}
