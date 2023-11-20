import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



const PublicacionesDeUsuario = ({ publicaciones }) => {
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);
  const router = useRouter();

  const confirmarEliminar = (publicacionId) => {
    setConfirmacionEliminar(publicacionId);
   
  };

  const eliminarPublicacion = async (publicacionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/publicacion/eliminar/${publicacionId}`
      );
     
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
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setConfirmacionEliminar(publicacion._id)}
                >
                  Eliminar
                </button>

                {/* Confirmación de eliminación */}
                {confirmacionEliminar === publicacion._id && (
                  <div className=" p-4 rounded ">
                    <p className="text-gray-700">
                      ¿Estás seguro de que deseas eliminar esta publicación?
                    </p>
                    <div className="flex justify-end mt-2">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                        onClick={() =>
                          eliminarPublicacion(confirmacionEliminar)
                        }
                      >
                        Sí
                      </button>
                      <button
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
                        onClick={() => setConfirmacionEliminar(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PublicacionesDeUsuario;
