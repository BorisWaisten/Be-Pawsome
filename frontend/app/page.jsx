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
          <li key={publicacion._id.$oid}>
            <h3>{publicacion.titulo}</h3>
            <div>
              {/* Imágenes del animal */}
              {publicacion.animal.fotos.map((foto, index) => (
                <img key={index} src={foto} alt={`Foto ${index + 1}`} style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "5px" }} />
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
    </main>
  );
}
