"use client";
import CartaPublicacion from "./CartaPublicacion";
import {getPublicaciones,obtenerUsuarioLogeado} from "../../persistencia/peticiones"
import React,{useState,useEffect} from "react";

export default async function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicacionesData = await getPublicaciones();
        const { usuario } = await obtenerUsuarioLogeado();

        if (publicacionesData && usuario) {
          const publicacionesFiltradas = publicacionesData.filter((p) => p.usuario._id !== usuario._id);
          setPublicaciones(publicacionesFiltradas);
        }else{
          setPublicaciones(publicacionesData);
        }
        setDatosCargados(true);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // El segundo argumento del useEffect es un array de dependencias, en este caso, está vacío para que se ejecute solo una vez.

  if (!datosCargados) {
    // Mostrar un mensaje de carga o un spinner mientras se cargan los datos
    return <p>Cargando...</p>;
  }

  // var publicaciones = await getPublicaciones();
  // const { usuario } = await obtenerUsuarioLogeado();
  // if (publicaciones && usuario) {
  //   console.log(publicaciones);
  //   const publicacionesAMostrar = publicaciones.filter(p => {
  //     // Asegúrate de ajustar esto según la estructura real de tus objetos de usuario y publicación
  //     return p.usuario._id !== usuario._id;
  //   });

  //   publicaciones = publicacionesAMostrar;
  // }

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

