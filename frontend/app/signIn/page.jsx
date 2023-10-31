"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";

const login = async (datos) => {
  try {
    const response = await axios.post('http://localhost:5000/usuarios/login', datos);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
}

const FormLogin = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

 
const mandarANextAuth = async () => {
    const result = await signIn("credentials", {
      mail: formData.mail,
      password: formData.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  
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
          mandarANextAuth();
        } else {
          console.error("No se pudo obtener el ID del usuario o el token.");
        }
       
        // Almacena el usuario en sessionStorage
        sessionStorage.setItem("user", JSON.stringify(storedUser));

        // Llama a la función onLogin pasando el usuario
        setApiError(null); // Limpia cualquier error existente
        // Redirige al usuario a la página principal y forza la recarga del navbar
        //router.push("/"); //.then(() => window.location.reload());
        //router.refresh(); //este no logra mandar el refresh a la página principal
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          setApiError("No autorizado. Por favor, inicia sesión.");
        } else {
          setApiError(
            "Ocurrió un error. Por favor, inténtalo de nuevo más tarde."
          );
        }
      } else {
        setApiError("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  //className="flex flex-col items-center"
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Loguearse</h2>
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="mail" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            placeholder="Email"
            onChange={handleChange}
            onFocus={() => setApiError(null)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            onFocus={() => setApiError(null)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
          <br />
          <Link href="/signIn/recuperarContrasenia" 
            className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            ¿Olvidaste tu contraseña?
          </Link>
        </form>
      </div>
      {apiError && (
        <div className="error card my-5">
          <p>{apiError}</p>
        </div>
      )}
    </>
  );
};

export default FormLogin;