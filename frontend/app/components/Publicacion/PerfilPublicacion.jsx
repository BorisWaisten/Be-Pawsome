import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

function PerfilPublicacion({ publicacion }) {
  const { data: session } = useSession();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? publicacion.animal.fotos.length - 1 : prevIndex - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === publicacion.animal.fotos.length - 1 ? 0 : prevIndex + 1
    );
  }

  const handleMostrarDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  async function agregarACasita() {
    try {
      const datos = {
        idAdoptante: session?.user?.userLogueado._id,
        publicacion: publicacion,
      };
      const respuesta = await axios.post(
        "http://localhost:5000/publicacion/solicitar",
        datos
      );
      setCargando(true);
      // Verificar si la solicitud fue exitosa antes de mostrar el mensaje
      if (respuesta.status === 200) {
        // Actualizar el estado para mostrar el mensaje de éxito
        setMensajeExito("¡Tu perro fue agregado a CASITA correctamente!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      return respuesta;
    } catch (error) {
      // Capturar el error específico relacionado con "El animal ya está en Casita"
      if (error.response && error.response.data.error === "El animal ya está en Casita.") {
        // Mostrar un mensaje al usuario indicando que el animal ya está en Casita
        setMensajeExito("¡Este perro ya está en CASITA!");
      
      } else {
        // Mostrar otros errores en la consola para depuración
        console.error(error);
        // Establecer el mensaje de error para mostrar al usuario
        setMensajeError("Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.");
        setCargando(false);
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full">
      {/* Columna de la imagen */}
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
      {/* Columna de detalles */}
      <div className="bg-white rounded-lg p-4 w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4">{publicacion.titulo}</h3>
        <button
          className="bg-blue-500 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded mx-auto mt-auto mb-4"
          onClick={agregarACasita}
          disabled={cargando}  // Deshabilita el botón si está cargando
        >
          {cargando ? 'En casita!...' : 'Quiero adoptarlo'}
        </button>
        <p className="font-bold mb-2 text-lg">
          Nombre: {publicacion.animal.nombre}
        </p>
        <p className="mb-2 text-m">Edad: {publicacion.animal.edad} años</p>
        <p className="mb-2">Peso: {publicacion.animal.pesoEnKg} kg</p>
        {/* Agrega más detalles según la estructura de tus datos */}
        <p className="mb-2">Descripción: {publicacion.animal.descripcion} </p>
        <p className="mb-2">Ubicación: {publicacion.animal.ubicacion}</p>
        <p className="mb-2">
          Historia Clínica: {publicacion.animal.historiaClinica}
        </p>
        <p className="font-bold text-lg">
          Usuario Oferente: {publicacion.usuario.nombre}
        </p>
      </div>
      {mensajeExito && (
        <div className="mensaje-exito">
          {mensajeExito}
        </div>
      )}
      {mensajeExito === null && (
        <div className="mensaje-error">
          {mensajeError}
        </div>
      )}
    </div>
  );
}
export default PerfilPublicacion;
