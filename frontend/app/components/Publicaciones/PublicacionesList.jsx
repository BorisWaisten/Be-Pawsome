"use client";
import CartaPublicacion from "./CartaPublicacion";
import {getPublicaciones} from "../../persistencia/peticiones"
import React,{useState,useEffect} from "react";
import { useSession } from "next-auth/react";

export default async function PublicacionesList() {
  const [publicaciones, setPublicaciones] = useState([]);
  const { data: session } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicacionesData = await getPublicaciones();
       
        const publicacionesAMostrar = publicacionesData.filter(publicacion => {
          return publicacion.usuarioId !== session.user?.userLogueado._id;
        });

        setPublicaciones(publicacionesAMostrar);
      
       
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []); // El segundo argumento del useEffect es un array de dependencias, en este caso, está vacío para que se ejecute solo una vez.

  

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
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
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

