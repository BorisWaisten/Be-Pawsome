"use client";
import CartaPublicacion from "./CartaPublicacion";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function PublicacionesList( publicacionesSearch ) {
  const { data: session } = useSession();
  const [publicaciones, setPublicaciones] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);

  console.log(publicacionesSearch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (publicacionesSearch && publicacionesSearch.length > 0) {
          setPublicaciones(publicacionesSearch);
          console.log(publicaciones+ "1");
        } else if (publicaciones.length === 0) {
          const response = await fetch("http://localhost:5000/publicacion/publicaciones");
          const publicacionesData = await response.json();
          //console.log(publicacionesData);
          setPublicaciones(publicacionesData);
          console.log(publicaciones+ "2");

        }

        // Verifica que session y sus propiedades estén definidas antes de acceder a subpropiedades
        const idUsuario = session?.user?.userLogueado?._id;

        if (idUsuario) {
          console.log("hola 2");
          const publicacionesFiltradas = publicaciones.filter((p) => p.usuario._id !== idUsuario);
          setPublicaciones(publicacionesFiltradas);
          console.log(publicaciones + "3");
        }
        setDatosCargados(true);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [publicaciones, publicacionesSearch, session]); // Agregué session como dependencia al useEffect para que se ejecute si cambia

  if (!datosCargados) {
    // Mostrar un mensaje de carga o un spinner mientras se cargan los datos
    return <p>Cargando...</p>;
  }
  if (!datosCargados) {
    // Mostrar un mensaje de carga o un spinner mientras se cargan los datos
    return <p>Cargando...</p>;
  }

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {publicaciones.map((publicacion) => (
          <li key={publicacion._id} className="w-full h-full">
            <CartaPublicacion publicacion={publicacion} />
          </li>
        ))}
      </ul>
      {publicaciones.length === 0 && (
        <p className="text-center"> Todavía no hay publicaciones realizadas.</p>
      )}
    </>
  );
}
