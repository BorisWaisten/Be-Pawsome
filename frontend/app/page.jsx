"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a tu endpoint de backend
    axios.get("http://localhost:5000/publicacion/publicaciones")
      .then(response => {
        // Actualizar el estado con los datos recibidos
        setPublicaciones(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las publicaciones:", error);
      });
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <main>
      <h2>Dashboard</h2>
      {/* Resto del contenido... */}
      <h2>Publicaciones desde el Backend</h2>
      <ul>
        {publicaciones.map(publicacion => (
          <li key={publicacion.id}>
            {/* Mostrar los detalles de cada publicación aquí */}
            <p>{publicacion.titulo}</p>
            <p>{publicacion.contenido}</p>
            {/* Agrega más campos según la estructura de tus datos */}
          </li>
        ))}
      </ul>
    </main>
  );
}
