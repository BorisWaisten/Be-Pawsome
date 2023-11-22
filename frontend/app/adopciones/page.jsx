'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdopcionesPage = () => {
  const [adopciones, setAdopciones] = useState([]);

  useEffect(() => {
    const fetchAdopciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/adopcion/'); // Ruta de la API para obtener las adopciones
        console.log(response.data);
        setAdopciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdopciones();
  }, []);

  return (
    <div>
      {Array.isArray(adopciones) && 
      adopciones.map(adopcion => (
        <div >
          <h2>{adopcion.adoptante.nombre}</h2>
          <img src={adopcion.animal.fotos[0]} alt={adopcion.animal.nombre} />
          <p>Oferente: {adopcion.oferente}</p>
          <p>Adoptante: {adopcion.adoptante.nombre}</p> {/* Asegúrate de acceder a la propiedad correcta del adoptante */}
          {/* Mostrar más datos del animal y usuarios si es necesario */}
        </div>
      ))}
    </div>
  );
  
};

export default AdopcionesPage;
