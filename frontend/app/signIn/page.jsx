"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";

const login = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/usuarios/login",
      datos
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Captura y lanza el error para que sea manejado por el componente
  }
};

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

  const handleError = (error) => {
    if (axios.isAxiosError(error)) {
      if (
        error.response.data ===
        '"password" failed custom validation because La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número'
      ) {
        setApiError(
          "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"
        );
      } else {
        setApiError(error.response.data);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      const usuarioValido = response.userLogueado;
      if (usuarioValido) {
        mandarANextAuth();
      } else {
        console.error("No se pudo obtener el ID del usuario o el token.");
      }
      setApiError(null); // Limpia cualquier error existente
    } catch (error) {
      handleError(error);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-4 justify-center flex">Iniciar Sesion</h2>
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="mail"
                className="block text-gray-700 font-bold mb-2"
              >
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
                className=" border-purple-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
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
                className=" border-purple-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar Sesión
              </button>
              <br />
              <Link
                href="/signIn/recuperarContrasenia"
                className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </form>
          </div>
          {apiError && (
            <div className="error card my-5">
              <p>{apiError}</p>
            </div>
          )}
        </div>
      </div>
      )
    </>
  );
};

export default FormLogin;