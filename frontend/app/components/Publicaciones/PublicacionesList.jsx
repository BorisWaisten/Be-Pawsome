import CartaPublicacion from "./CartaPublicacion";

async function getPublicaciones() {
 
  const res = await fetch ("http://localhost:5000/publicacion/publicaciones",{
        cache: 'no-store',
        next: {
           validate: 0 // uso 0 para no tener nada en el cache y hacer siempre un fetch
       } 
    });
    return res.json()
}

export default async function PublicacionesList() {
  const publicaciones = await getPublicaciones();

  return (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
           {publicaciones.map(publicacion => (
             <li key={publicacion._id} className="w-full h-full">
              <CartaPublicacion publicacion={publicacion} />
             </li>
           ))}
         </ul>
          {publicaciones.length === 0 && (
            <p className="text-center"> Todavia no Hay publicaciones Realizadas!</p>
          )}
        </>
      )
    }

