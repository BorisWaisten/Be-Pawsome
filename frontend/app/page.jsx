"use client"
import { Suspense } from "react"
import Cargando from "./components/cargando.jsx"
import BarraBuscadora from "./components/BarraBuscadora.jsx"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PublicacionesList from "./components/Publicacion/PublicacionesList.jsx"


export default function page() {
  const { data: session } = useSession();
  const [publicaciones, setPublicaciones] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/publicacion/publicaciones");
        const publicacionesData = await response.json();
  
        const idUsuario = session?.user?.userLogueado?._id;
  
        if (idUsuario) {
          const publicacionesFiltradas = publicacionesData.filter((p) => p.usuario._id !== idUsuario);
          setPublicaciones(publicacionesFiltradas);
        } else {
          setPublicaciones(publicacionesData);
        }
  
        setDatosCargados(true);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    fetchData();
  }, [session]);
  
  const getPublicaciones = (publicacionesSearch) => {
    
    const idUsuario = session?.user?.userLogueado?._id;
    if (idUsuario) {
      const publicacionesFiltradas = publicacionesSearch.filter((p) => p.usuario._id !== idUsuario);
      setPublicaciones(publicacionesFiltradas);
    }else{
      setPublicaciones(publicacionesSearch);
    }
  }

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
        <div>
          <Suspense fallback={<Cargando/>}>
            <BarraBuscadora getPublicaciones={getPublicaciones}/>
            <PublicacionesList publicaciones={publicaciones}/>
          </Suspense> 
        </div>
      </>
    )
  }