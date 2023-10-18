// persistencia/usuarioLogueado.jsx

import axios from 'axios';

export const obtenerUsuarioLogeado = async () => {
  try {
    // Verificar si sessionStorage está disponible
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
      
      if (usuarioEnSesion && usuarioEnSesion._id) {
        const idUsuario = usuarioEnSesion._id;
        const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        return { usuario: response.data, error: null };
      } else {
        return { usuario: null, error: 'No se pudo obtener el ID del usuario de la sesión.' };
      }
    } else {
      return { usuario: null, error: 'sessionStorage no está disponible.' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al cargar los datos del usuario.'); // Captura y lanza el error para que sea manejado por el componente
  }
};

export const obtenerPublicacionesDelUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`http://localhost:5000/publicacion/publicacionesUsuario/${usuarioId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}` // Incluye el token de autenticación en los headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { publicaciones: data };
    } else {
      throw new Error('Error al obtener las publicaciones del usuario');
    }
  } catch (error) {
    throw new Error('Error al obtener las publicaciones del usuario.'); // Captura y lanza el error para que sea manejado por el componente
  }
};

export const editarUsuario = async (usuarioId, nuevosDatos) => {
  try {
    const usuarioEditado = await axios.put(`http://localhost:5000/usuarios/${usuarioId}`, nuevosDatos);

    // Actualizar la información del usuario en sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
      if (usuarioEnSesion) {
        // Actualizar solo los campos editados
        sessionStorage.setItem('user', JSON.stringify({ ...usuarioEnSesion, ...nuevosDatos }));
      }
    }
    return usuarioEditado.data;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
};
