// publicacion/logica.jsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Logica = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    nombre: '',
    fotos: [],
    edad: '',
    tipoAnimal: '',
    descripcion: '',
    sexo: '',
    pesoEnKg: '',
    ubicacion: '',
    idOferente: sessionStorage.getItem('idUsuario'),
    historiaClinica: '',
  });

  const handleFileChange = (e) => {
    // Manejar la carga de archivos (fotos) si es necesario
    const files = e.target.files;
    // Lógica para manejar los archivos, por ejemplo, almacenarlos en formData.fotos
  };

  const handleSubmit = async (e, token) => {
    e.preventDefault();

    try {
      // Crear el animal primero
      const animalResponse = await axios.post(
        'http://localhost:5000/animal/crear',
        formData // Puedes ajustar esto según tu API de creación de animales
      );

      // Luego, utilizar la respuesta del animal para crear la publicación
      const response = await axios.post(
        'http://localhost:5000/publicacion/crear',
        {
          titulo: formData.titulo,
          idUsuario: sessionStorage.getItem('idUsuario'),
          animal: animalResponse.data, // Usar la respuesta del animal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Publicación creada:', response.data);
      // Puedes manejar la respuesta del servidor según tus necesidades.
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      // Puedes manejar los errores de la solicitud aquí.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, localStorage.getItem('jwtToken'))}>
      <label>
        Titulo:
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
      </label>
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <br />

      <label>
        Fotos:
        <input type="file" name="fotos" onChange={handleFileChange} multiple />
      </label>
      <br />

      <label>
        Edad:
        <input type="text" name="edad" value={formData.edad} onChange={handleChange} />
      </label>
      <br />

      {/* Otros campos similares para tipoAnimal, descripcion, sexo, pesoEnKg, ubicacion, historiaClinica */}

      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default Logica;
