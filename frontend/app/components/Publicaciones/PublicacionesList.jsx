import CartaPublicacion from "./CartaPublicacion";
import {getPublicaciones,obtenerUsuarioLogeado} from "../../persistencia/peticiones"


export default async function PublicacionesList() {
  
  var publicaciones = await getPublicaciones();
  const { usuario } = await obtenerUsuarioLogeado();

  if (publicaciones && usuario) {
    const publicacionesAMostrar = [];
    publicaciones.forEach(p => {
      // Verifica si p.usuario está definido y tiene la propiedad _id
      if (p.usuario !== usuario) {
        publicacionesAMostrar.push(p);
      }
    });
    publicaciones = publicacionesAMostrar;
  }

  return (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
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

