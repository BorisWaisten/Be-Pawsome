import Image from "next/image"
import {getPublicaciones,obtenerUsuarioLogeado} from "../persistencia/peticiones"


export default async function PublicacionesList() {
  var publicaciones = await getPublicaciones();
  const { usuario, error } = await obtenerUsuarioLogeado();
  
  if (publicaciones && Array.isArray(publicaciones) && usuario) {
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
          <ul>
           {publicaciones.map(publicacion => (
             <li key={publicacion._id.$oid} className="card my-5">
               <h3>Titulo: {publicacion.titulo}</h3>
               <div className="flex">
                 {/* Imágenes del animal */}
                 {publicacion.animal.fotos.map((foto, index) => (
                   <Image key={index} className="mr-4" src={foto} alt={`Foto ${index + 1}`} width={150} height={150} quality={100}/> 
                 ))}
               </div>
               <div>
                 {/* Detalles del animal */}
                 <p>Nombre: {publicacion.animal.nombre}</p>
                 <p>Edad: {publicacion.animal.edad} años</p>
                 <p>Peso: {publicacion.animal.pesoEnKg} kg</p>
                 <p>Sexo: {publicacion.animal.sexo}</p>
                 <p>Descripcion: {publicacion.animal.descripcion} </p>
                 <p>Ubicacion: {publicacion.animal.ubicacion}</p>
                 <p>Historia Clinica: {publicacion.animal.historiaClinica}</p>
                 
                 {/* Agrega más detalles según la estructura de tus datos */}
               </div>
               <div>
                 {/* Nombre del usuario */}
                 <p>Usuario Oferente: {publicacion.usuario && publicacion.usuario.nombre}</p>
                 {/*<h4>Publicado por: {publicacion.animal.oferente.nombre} {publicacion.animal.oferente.apellido}</h4>*/}
               </div>
             </li>
           ))}
         </ul>
          {publicaciones.length === 0 && (
            <p className="text-center"> Todavia no Hay publicaciones Realizadas!</p>
          )}
        </>
      )
    }

