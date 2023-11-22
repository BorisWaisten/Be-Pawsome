import React from "react";

import { useState } from "react";

const AdopcionCard = ({ adopcion }) => {
  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? adopcion.animal.fotos.length - 1 : prevIndex - 1
    );
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === adopcion.animal.fotos.length - 1 ? 0 : prevIndex + 1
    );
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full border border-purple-200 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
      <h3 className="text-xl font-bold mb-4">{adopcion.animal.nombre}</h3>
      <div className="slider-container relative ">
        {/* Flecha izquierda */}
        <span
          className="slider-arrow left absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handlePrevImage}
        >
          &#10094;
        </span>
        {/* Imagen actual */}
        <img
          className="rounded-lg w-full h-72 object-cover border-2 border-purple-300"
          src={
            adopcion && adopcion.animal && adopcion.animal.fotos
              ? adopcion.animal.fotos[currentImageIndex]
              : ""
          }
          alt={`Foto ${currentImageIndex + 1}`}
        />
        {/* Flecha derecha */}
        <span
          className="slider-arrow right absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
          onClick={handleNextImage}
        >
          &#10095;
        </span>
      </div>
      <div className="text-center text-xl font-bold pt-2 my-5 items-center">
        <div className="my-5">
        <h3> OFERENTE: {adopcion.oferente.nombre}</h3>
        </div>
        <h3> ADOPTANTE: {adopcion.adoptante.nombre}</h3>
      </div>
    </div>
  );
};

export default AdopcionCard;
