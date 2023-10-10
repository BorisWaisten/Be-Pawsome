"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener datos del usuario logeado
    const obtenerUsuarioLogeado = async () => {
      try {
        // Hacer una solicitud al servidor para obtener los datos del usuario logeado
        const response = await axios.get('http://localhost:5000/usuarios/id', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}` // Obtener el token de sessionStorage o donde lo tengas almacenado
          }
        });

        // Establecer el usuario en el estado
        setUsuario(response.data);
        setLoading(false); // Cambiar el estado de carga a falso
      } catch (error) {
        console.error(error);
        setLoading(false); // Cambiar el estado de carga a falso en caso de error
      }
    };

    // Llamar a la función para obtener el usuario logeado
    obtenerUsuarioLogeado();
  }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez, al montar el componente

  // Si se está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  // Si el usuario es nulo, muestra un mensaje de error o redirección a la página de inicio de sesión
  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  // Muestra los detalles del usuario
  return (
    <main>
      <h2>Usuario</h2>
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Email: {usuario.mail}</p>
      <p>Celular: {usuario.celular}</p>
      <p>Localidad: {usuario.localidad}</p>
      <p>Provincia: {usuario.provincia}</p>
      <p>Nacionalidad: {usuario.nacionalidad}</p>
      <p>Código Postal: {usuario.codigoPostal}</p>
      {/* Agrega más campos según sea necesario */}
    </main>
  );
}
