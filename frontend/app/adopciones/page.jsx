'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdopcionesPage = () => {
  const [adopciones, setAdopciones] = useState([]);

  useEffect(() => {
    const fetchAdopciones = async () => {
      try {
        const response = await axios.get('/adopciones'); // Ruta de la API para obtener las adopciones
        setAdopciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdopciones();
  }, []);

  return (
    <div>
      {adopciones.map((adopcion) => (
        <div key={adopcion.id} className="publicacion">
          <h2>{adopcion.nombre}</h2>
          <img src={adopcion.foto} alt={adopcion.nombre} />
          <p>Oferente: {adopcion.oferente}</p>
          <p>Adoptante: {adopcion.adoptante}</p>
          {/* Mostrar más datos del animal y usuarios si es necesario */}
        </div>
      ))}
    </div>
  );
};

export default AdopcionesPage;
