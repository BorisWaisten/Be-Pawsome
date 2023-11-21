import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

function PerfilPublicacion({ publicacion }) {
  const { data: session } = useSession();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //const router = useRouter();

  useEffect(() => {
    if (modalVisible) {
      const modalTimeout = setTimeout(() => {
        setModalVisible(false);
      }, 2000);

      return () => clearTimeout(modalTimeout);
    }
  }, [modalVisible]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? publicacion.animal.fotos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === publicacion.animal.fotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMostrarDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  async function agregarACasita() {
    try {
      const datos = {
        idAdoptante: session?.user?.userLogueado._id,
        publicacion: publicacion,
      };

      const mensajeSolicitud = await axios.post(
        "http://localhost:5000/publicacion/solicitar",
        datos
      );

      // Muestra el modal al realizar la acción
      setModalVisible(true);

      return mensajeSolicitud;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full">
      <div className="relative w-full md:w-1/2 flex flex-col">
        {publicacion && publicacion.animal && publicacion.animal.fotos
          ? publicacion.animal.fotos.map((foto, index) => (
              <img
                key={index}
                className="rounded-lg w-full h-auto object-cover mb-4"
                src={foto}
                alt={`Foto ${index + 1}`}
              />
            ))
          : ""}
      </div>

      <div className="bg-white rounded-lg p-4 w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4">{publicacion.titulo}</h3>
        <button
          className="bg-blue-500 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded mx-auto mt-auto mb-4"
          onClick={agregarACasita}
        >
          Quiero adoptarlo
        </button>

        {modalVisible && (
          <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <p>¡Adopción solicitada!</p>
          <div className="bg-violet-700 p-8 rounded shadow-lg text-white"> 
            <button onClick={handleModalClose}>Se envio la solicitud de adopcion</button>
          </div>
          </div>
        )}

        <p className="font-bold mb-2 text-lg">
          Nombre: {publicacion.animal.nombre}
        </p>
        <p className="mb-2 text-m">Edad: {publicacion.animal.edad} años</p>
        <p className="mb-2">Peso: {publicacion.animal.pesoEnKg} kg</p>
        <p className="mb-2">Descripción: {publicacion.animal.descripcion} </p>
        <p className="mb-2">Ubicación: {publicacion.animal.ubicacion}</p>
        <p className="mb-2">
          Historia Clínica: {publicacion.animal.historiaClinica}
        </p>
        <p className="font-bold text-lg">
          Usuario Oferente: {publicacion.usuario.nombre}
        </p>
      </div>
    </div>
  );
}

export default PerfilPublicacion;
