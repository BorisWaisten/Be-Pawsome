import { useState } from "react";
import axios from "axios";

const PublicacionesDeUsuario = ({ publicaciones }) => {
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(null);
  const [interesadosDetails, setInteresadosDetails] = useState([]);
  const [showInteresados, setShowInteresados] = useState(false);

  const getInteresadosDetails = async (interesadosIds) => {
    const details = await Promise.all(
      interesadosIds.map(async (id) => {
        const response = await axios.get(
          `http://localhost:5000/usuarios/${id}`
        );
        return response.data;
      })
    );
    setInteresadosDetails(details);
    console.log("mis interesados ", interesadosDetails);
  };

  const handleVerInteresadosClick = (interesadosIds) => {
    if (showInteresados) {
      setShowInteresados(false);
    } else {
      getInteresadosDetails(interesadosIds);
      setShowInteresados(true);
    }
  };

  const finalizarAdopcion = async (interesadoId, publicacionId) => {
    try {
      const datos = {
        idInteresado: interesadoId,
        idPublicacion: publicacionId,
      };
      await axios.post("http://localhost:5000/adopcion/crear", datos);
    } catch (error) {
      console.error(error);
    } finally {
      // Limpiar la confirmación después de eliminar o cancelar
      setConfirmacionEliminar(null);
    }
  };

  const confirmarEliminar = (publicacionId) => {
    setConfirmacionEliminar(publicacionId);
  };

  const eliminarPublicacion = async (publicacionId) => {
    try {
      await axios.delete(`http://localhost:5000/publicacion/eliminar/${publicacionId}`);
    } catch (error) {
      console.error(error);
    } finally {
      // Limpiar la confirmación después de eliminar o cancelar
      setConfirmacionEliminar(null);
      // Recargar la página
      window.location.reload();
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
                  onClick={() =>
                    handleVerInteresadosClick(publicacion.interesados)
                  }
                >
                  Ver interesados ( {publicacion.interesados.length} )
                </button>
                {showInteresados &&
                  interesadosDetails.map(() => (
                    <div className="w-full lg:w-1/5 mx-auto">
                      {interesadosDetails.map((interesado) => (
                        <li key={interesado._id}>
                          <div className="bg-white shadow rounded-lg p-6 my-4">
                            <p className="text-gray-700 font-semibold">
                              Nombre:
                            </p>
                            {interesado.nombre}
                            <p className="text-gray-700 font-semibold">
                              Teléfono:
                            </p>
                            {interesado.celular}
                            <p className="text-gray-700 font-semibold">
                              Email:{" "}
                            </p>
                            {interesado.mail}
                            <p className="text-gray-700 font-semibold">
                              Ubicación:
                            </p>
                            {interesado.localidad}
                            <button
                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                              onClick={() =>
                                finalizarAdopcion(
                                  interesado._id,
                                  publicacion._id,
                                )
                              }
                            >
                              Concretar adopción
                            </button>
                          </div>
                        </li>
                      ))}
                    </div>
                  ))}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded relative"
                  onClick={() => confirmarEliminar(publicacion._id)}
                >
                  Eliminar
                </button>
                {/* Confirmación de eliminación */}
                {confirmacionEliminar === publicacion._id && (
                  <div className=" p-4 rounded shadow-lg">
                    <p className=" font-extrabold text-justify p-1 mb-2">
                      ¿Estás seguro de que deseas eliminar esta publicación?
                    </p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"
                      onClick={() => eliminarPublicacion(confirmacionEliminar)}
                    >
                      Sí
                    </button>
                    <button
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
                      onClick={() => setConfirmacionEliminar(null)}
                    >
                      No
                    </button>
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
