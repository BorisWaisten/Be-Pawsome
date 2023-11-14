import React from "react";
import axios from "axios";


const SolicitudesDeUsuario = ({ publicaciones, idUsuario, actualizarPublicaciones }) => {

    const confirmarEliminar = async (publicacionId) => {
        const confirmacion = window.confirm(
          "¿Estás seguro de que deseas eliminar esta solicitud?"
        );
        if (confirmacion) {
          // Llamar a la función para eliminar la solicitud
          eliminarSolicitud( publicacionId);
        }
      };
    
      const eliminarSolicitud = async (publicacionId) => {
        try {
          // Hacer una solicitud DELETE para eliminar la solicitud en el backend
          // Implementa esta función usando fetch o axios
          const solicitudEliminada = await axios.delete(`http://localhost:5000/usuarios/eliminarSolicitud/${idUsuario}`, {
            data: { publicacionId }, // Pasar publicacionId en el cuerpo de la solicitud
          });
          if (solicitudEliminada) {
            // Llama a la función actualizarPublicaciones después de eliminar la solicitud
            actualizarPublicaciones(publicacionId);
        }
          return solicitudEliminada
        } catch (error) {
          console.error(error);
          // Manejar errores, mostrar un mensaje al usuario, etc.
        }   
      };



  return (
    <div>
      <ul className="divide-y divide-violet-200">
        {Array.isArray(publicaciones) &&
          publicaciones.map((publicacion) => (
            <li key={publicacion._id} className="my-4">
              <div className="flex items-center justify-between space-x-5 border-1 border-gray-200 py-4 px-2">
                <div className="rounded-lg w-24 h-24 overflow-hidden">
                  <img
                    src={publicacion.animal.fotos[0]}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-violet-900 truncate">
                    {publicacion.titulo}
                  </div>
                  <div className="text-sm text-black-500">
                    {publicacion.animal.descripcion}
                  </div>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => confirmarEliminar(publicacion._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SolicitudesDeUsuario;