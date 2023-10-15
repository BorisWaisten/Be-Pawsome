"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DatosPerfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarioLogeado = async () => {
      try {
        const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
        if (usuarioEnSesion && usuarioEnSesion._id) {
          const idUsuario = usuarioEnSesion._id;
          const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          
          setUsuario(response.data);
          setError(null);
        } else {
          setError('No se pudo obtener el ID del usuario de la sesión.');
        }
      } catch (error) {
        console.error(error);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };
  
    obtenerUsuarioLogeado();
  }, []);

  // Si se está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si el usuario es nulo, muestra un mensaje de error o redirección a la página de inicio de sesión
  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  // Muestra los detalles del usuario
  return (
    <main>
      <h2>Usuario</h2>
      <img src={usuario.imagenPerfil} alt="Foto de perfil" style={{ width: '150px', height: '150px' }} />
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