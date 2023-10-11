import React, { useState } from 'react';
import axios from 'axios';

export default function crearPublicacion() {
  const [titulo, setTitulo] = useState('');
  const [animal, setAnimal] = useState('');

  const handleSubmit = async (e, token) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/publicacion', {
        titulo,
        animal,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Agrega el token JWT en el encabezado de autorización
        }
      });

      console.log('Publicación creada:', response.data);
      // Puedes manejar la respuesta del servidor según tus necesidades.
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      // Puedes manejar los errores de la solicitud aquí.
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, sessionStorage.getItem('jwtToken'))}>
      <label>
        Título:
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </label>
      <br/>
      <label>
        Animal:
        <input type="text" value={animal} onChange={(e) => setAnimal(e.target.value)} />
      </label>
      <br />
      <button type="submit">Crear Publicación</button>
    </form>
  );
}