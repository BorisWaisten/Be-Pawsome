"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { obtenerUsuarioLogeado } from '@/app/persistencia/usuarioLogueado';

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const { usuario, error } = await obtenerUsuarioLogeado();
        if (usuario) {
          setUsuario(usuario);
          setError(null);
        } else {
          setError(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    cargarUsuario();
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