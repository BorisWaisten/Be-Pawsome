import { useState } from "react";
import axios from "axios";

const PublicacionesDeUsuario = ({ publicaciones }) => {
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);
  const [desplegarInteresados, setDesplegarInteresados] = useState({});
  

  const confirmarEliminar = (publicacionId) => {
    setConfirmacionEliminar(publicacionId);
  };

  const eliminarPublicacion = async (publicacionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/publicacion/eliminar/${publicacionId}`
      );
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
      <h1 className="mt-3 items-center justify-center flex">
        Mis publicaciones
      </h1>
      <ul className="divide-y divide-violet-200">
        {Array.isArray(publicaciones) &&
          publicaciones.map((publicacion) => (
            <li key={publicacion._id} className="my-4">
              {/* ...otros códigos... */}
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setDesplegarInteresados(!desplegarInteresados)}
              >
                Ver interesados
              </button>
              {desplegarInteresados && (
                <ul className="mt-2 bg-white shadow rounded p-4">
                  {publicacion.interesados.map((interesado) => (
                    <li
                      key={interesado._id}
                      className="flex justify-between items-center mb-2"
                    >
                      <span className="text-gray-700">{interesado.nombre}</span>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => concretarAdopcion(interesado._id)}
                      >
                        Concretar adopción
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>

      

      {/* Confirmación de eliminación */}
      {confirmacionEliminar && (
        <div>
          <p>¿Estás seguro de que deseas eliminar esta publicación?</p>
          <button onClick={() => eliminarPublicacion(confirmacionEliminar)}>
            Sí
          </button>
          <button onClick={() => setConfirmacionEliminar(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default PublicacionesDeUsuario;
