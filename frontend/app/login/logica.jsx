"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { login } from "../persistencia/peticiones";

const Login = ({ onLogin }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(response.userLogueado._id);
      console.log(response.accesToken);

      const storedUser = response.userLogueado;
      const idUsuario = storedUser ? storedUser._id : null;
      const accessToken = response.accesToken; // Corregir la propiedad del token

      if (idUsuario && accessToken) {
        // Resto del código para obtener el usuario
        // Agregar el ID del usuario y el token a sessionStorage
        sessionStorage.setItem("idUsuario", idUsuario);
        sessionStorage.setItem("token", accessToken);
      } else {
        console.error("No se pudo obtener el ID del usuario o el token.");
      }

      // Almacena el usuario en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(storedUser));

      // Llama a la función onLogin pasando el usuario
      onLogin(storedUser); // Solo pasa el objeto de usuario, no toda la respuesta
      setError(null); // Limpia cualquier error existente
      // Redirige al usuario a la página principal y forza la recarga del navbar
      router.push('/') //.then(() => window.location.reload());


    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          setError("No autorizado. Por favor, inicia sesión.");
        } else {
          setError(
            "Ocurrió un error. Por favor, inténtalo de nuevo más tarde."
          );
        }
      } else {
        setError("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
      }
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
  />
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
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
  />
  {error && <div style={{ color: "red" }} className="mb-4">{error}</div>}
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
    Iniciar Sesión
  </button>
  <a href="#" className="text-gray-500 hover:text-gray-700">¿Olvidaste tu contraseña?</a>
</form>
  );
};

export default Login;
