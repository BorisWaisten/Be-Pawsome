import { useState } from "react";
import axios from "axios";

const PublicacionesDeUsuario = ({ publicaciones }) => {
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);

  const confirmarEliminar = (publicacionId) => {
    setConfirmacionEliminar(publicacionId);
  };

  const eliminarPublicacion = async (publicacionId) => {
    try {
      await axios.delete(`http://localhost:5000/publicacion/eliminar/${publicacionId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      // Limpiar la confirmación después de eliminar o cancelar
      setConfirmacionEliminar(null);
    }
  };

  return (
    <div>
      <h1 className="mt-3">Publicaciones del usuario</h1>
      <ul className="divide-y divide-violet-200">
        {Array.isArray(publicaciones) &&
          publicaciones.map((publicacion) => (
            <li key={publicacion._id} className="my-4">
              <div className="flex items-center justify-between space-x-5 border-1 border-gray-200 py-4 px-2">
                <div className="rounded-lg w-24 h-24 overflow-hidden">
                  <img src={publicacion.animal.fotos[0]} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium text-violet-900 truncate">{publicacion.titulo}</div>
                  <div className="text-sm text-black-500">{publicacion.animal.descripcion}</div>
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

      {/* Confirmación de eliminación */}
      {confirmacionEliminar && (
        <div>
          <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
          <button onClick={() => eliminarPublicacion(confirmacionEliminar)}>Sí</button>
          <button onClick={() => setConfirmacionEliminar(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default PublicacionesDeUsuario;
