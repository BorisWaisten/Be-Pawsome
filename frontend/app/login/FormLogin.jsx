//"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const FormLogin = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post("/api/auth/login",formData)
        if(response.status == 200){
          console.log(response.data +"hola ")
          router.push("/");
        }
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
          <Link href="/login/recuperarContrasenia" 
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
