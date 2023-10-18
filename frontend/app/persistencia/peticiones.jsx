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
    return { usuario: null, error: 'Error al cargar los datos del usuario.' };
  }
};


export const editarUsuario = async (usuarioId, nuevosDatos) => {
  try {
    // Realizar la solicitud PUT para actualizar los datos del usuario en el backend
   const usuarioEditado =  await axios.put(`http://localhost:5000/usuarios/${usuarioId}`, nuevosDatos);

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
    // Manejar errores, mostrar un mensaje al usuario, etc.
    throw error; // Re-lanzar el error para que pueda ser manejado por el componente que llama a esta función
  }
};