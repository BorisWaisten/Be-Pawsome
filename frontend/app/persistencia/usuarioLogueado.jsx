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
