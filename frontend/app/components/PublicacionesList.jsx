import Link from "next/link";
import Image from "next/image"

async function getPublicaciones() {
 
  const res = await fetch ("http://localhost:5000/publicacion/publicaciones",{
       next: {
           validate: 0 // uso 0 para no tener nada en el cache y hacer siempre un fetch
       } 
    });
    return res.json()
}

export default async function PublicacionesList() {
  const publicaciones = await getPublicaciones();
  const srcBase = `https://images.dog.ceo/breeds/akita/Akita_hiking_in_Shpella_e_Pellumbasit.jpg`
  //console.log(publicaciones);
  console.log(publicaciones[1])
  return (
        <>
          <ul>
           {publicaciones.map(publicacion => (
             <li key={publicacion._id.$oid}>
               <h3>{publicacion.titulo}</h3>
               <div>
               {/*<Image src= {publicacion.animal.fotos[0]} alt='Galajo Logo' width={200}height={200}quality={100}        />
                 {/* Imágenes del animal */}
                 {/*publicacion.animal.fotos.map((foto, index) => (
                   <Image key={index} src={foto} alt={`Foto ${index + 1}`}/> 
                   
                 ))}
               </div>
               <div>
                 {/* Detalles del animal */}
                 <p>Nombre: {publicacion.animal.nombre}</p>
                 <p>Edad: {publicacion.animal.edad} años</p>
                 {/* Agrega más detalles según la estructura de tus datos */}
               </div>
               <div>
                 {/* Nombre del usuario */}
                 <h4>Publicado por: {publicacion.animal.oferente.nombre} {publicacion.animal.oferente.apellido}</h4>
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

