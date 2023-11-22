"use client";
import React, { useState, useEffect } from "react";
import ImagenAnimal from "../../uploadImagen/animal/page";

const CreatePublicacion = ({ handleSubmit, formData, updateFormData }) => {
  const [localFormData, setFormData] = useState({
    titulo: "",
    nombre: "",
    fotos: [],
    edad: "",
    tipoAnimal: "",
    descripcion: "",
    sexo: "",
    pesoEnKg: "",
    ubicacion: "",
    historiaClinica: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sexo") {
      console.log(value);
      localFormData.sexo = value;
    }

    if (name === "tipoAnimal") {
      console.log(value);
      localFormData.tipoAnimal = value;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Llama al método para actualizar formData después de actualizar el estado local
    updateFormData({
      [name]: value,
    });
  };

  const handleImageUpload = (secureUrl) => {
    // Puedes hacer lo que necesites con secureUrl, por ejemplo, actualizar formData.fotos
    updateFormData({
      fotos: [...formData.fotos, secureUrl], // Añade la nueva imagen al array existente
    });
  };

  return (
    <>
      {" "}
      <h1 className="text-2xl font-bold mb-4 flex items-center flex-1 justify-center">Crear publicacion</h1>
      <form
        onSubmit={(e) => handleSubmit(e, localStorage.getItem("jwtToken"))}
        className=" rounded-lg shadow-md p-6"
      >
        <label className="block mb-2 font-bold text-gray-700">
          Titulo:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Edad(años):
          <input
            type="text"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Tipo Animal:
          <select
            name="tipoAnimal"
            value={formData.tipoAnimal}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          >
            <option value="">Selecciona el tipo</option>
            <option value="PERRO">Perro</option>
            <option value="GATO">Gato</option>
            <option value="CONEJO">Conejo</option>
            <option value="REPTIL">Reptil</option>
            <option value="VACA">Vaca</option>
            <option value="PEZ">Pez</option>
          </select>
        </label>

        <label className="block mb-2 font-bold text-gray-700">
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Sexo:
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          >
            <option value="" placeholder="Seleciona el sexo del animal">
              Selecciona el sexo
            </option>
            <option value="MACHO">MACHO</option>
            <option value="HEMBRA">HEMBRA</option>
          </select>
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Peso en Kg:
          <input
            type="text"
            name="pesoEnKg"
            value={formData.pesoEnKg}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>

        <label className="block mb-2 font-bold text-gray-700">
          Ubicación:
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <label className="block mb-2 font-bold text-gray-700">
          Historia Clínica:
          <input
            type="text"
            name="historiaClinica"
            value={formData.historiaClinica}
            onChange={handleChange}
            className="w-full border border-gray-400 p-2 rounded-md"
          />
        </label>
        <div className="block mb-2 font-bold text-gray-700">
        <ImagenAnimal
          onImageUpload={handleImageUpload} // Pasa la función como prop
        />
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-primary text-white font-bold py-2 px-4 rounded w-1/3 h-10 items-center justify-center"
          >
            Crear publicacion
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePublicacion;