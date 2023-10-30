"use client";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginPage = () => {
  const mail = useRef("");
  const pass = useRef("");


  
  const onSubmit = async () => {
    await signIn("credentials", {
      mail: mail.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Loguearse</h2>
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        
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
       
      </div>
      {apiError && (
        <div className="error card my-5">
          <p>{apiError}</p>
        </div>
      )}
    </>
  );
};

export default LoginPage;
