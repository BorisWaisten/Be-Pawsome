"use client";
import axios from "axios";
import React, { useState } from "react";

function Registrar() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    mail: "",
    password: "",
    celular: "",
    localidad: "",
    provincia: "",
    nacionalidad: "",
    codigoPostal: "",
  });

  const [apiError, setApiError] = useState(null);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:5000/usuarios/register', {
  //       method: 'POST',
  //       body: JSON.stringify(formData),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await response.json();
  //     console.log(data); // Manejar la respuesta del servidor según tus necesidades, por ejemplo, mostrar un mensaje de éxito al usuario.
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/usuarios/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // Maneja la respuesta del servidor según tus necesidades, por ejemplo, muestra un mensaje de éxito al usuario.
    } catch (error) {
      setApiError(error.response.data);
      //console.log(apiError);
      console.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
     <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
    <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mail" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Email"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="celular" className="block text-gray-700 font-bold mb-2">
            Celular:
          </label>
          <input
            type="text"
            id="celular"
            name="celular"
            placeholder="Celular"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="localidad" className="block text-gray-700 font-bold mb-2">
            Localidad:
          </label>
          <input
            type="text"
            id="localidad"
            name="localidad"
            placeholder="Localidad"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="provincia" className="block text-gray-700 font-bold mb-2">
            Provincia:
          </label>
          <input
            type="text"
            id="provincia"
            name="provincia"
            placeholder="Provincia"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nacionalidad" className="block text-gray-700 font-bold mb-2">
            Nacionalidad:
          </label>
          <input
            type="text"
            id="nacionalidad"
            name="nacionalidad"
            placeholder="Nacionalidad"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codigoPostal" className="block text-gray-700 font-bold mb-2">
            Código Postal:
          </label>
          <input
            type="text"
            id="codigoPostal"
            name="codigoPostal"
            placeholder="Código Postal"
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-violet-700 text-center text-white text-center justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Registrarse
        </button>
      </form>
    </div>
    {apiError && (
      <div className="error card my-5">
        <p>{apiError}</p>
      </div>
    )}
  </>
  );
}

export default Registrar;
