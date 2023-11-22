"use client"
import { Suspense } from "react"
import Cargando from "./components/cargando.jsx"
import BarraBuscadora from "./components/BarraBuscadora.jsx"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PublicacionesList from "./components/Publicacion/PublicacionesList.jsx"

export default function page() {
  const { data: session } = useSession();
  const [publicacionesOriginales, setPublicacionesOriginales] = useState([]); // Nuevo estado
  const [publicaciones, setPublicaciones] = useState([]);
  const [datosCargados, setDatosCargados] = useState(false);
  const [query, setQuery] = useState("")
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/publicacion/publicaciones`);
        const publicacionesData = await response.json();

        const idUsuario = session?.user?.userLogueado?._id;

        if (idUsuario) {
          const publicacionesFiltradas = publicacionesData.filter((p) => p.usuario._id !== idUsuario);
          setPublicaciones(publicacionesFiltradas);
          setPublicacionesOriginales(publicacionesFiltradas); // Almacena las originales
        } else {
          setPublicaciones(publicacionesData);
          setPublicacionesOriginales(publicacionesData); // Almacena las originales
        }

        setDatosCargados(true);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [session]);

  const handleSearch = async (query) => {
    try {
      setQuery(query);
      const response = await fetch(`${apiUrl}/publicacion/buscar/${query}`);
      const publicacionesBuscadas = await response.json();

      const idUsuario = session?.user?.userLogueado?._id;

      if (idUsuario) {
        const publicacionesFiltradas = publicacionesBuscadas.filter((p) => p.usuario._id !== idUsuario);
        setPublicaciones(publicacionesFiltradas);
      } else {
        setPublicaciones(publicacionesBuscadas);
      }
    } catch (error) {
      console.error("Error al obtener datos de búsqueda:", error);
    }
  };

  // Restaurar las publicaciones originales al cambiar de URL
  useEffect(() => {
    if (!query) {
      setPublicaciones(publicacionesOriginales);
    }
  }, [query, publicacionesOriginales]);




  return (
      <>
        <div>
          <Suspense fallback={<Cargando/>}>
          <BarraBuscadora handleSearch={handleSearch} />
          <PublicacionesList publicaciones={publicaciones}/>
          </Suspense> 
        </div>
      </>
    )
  }