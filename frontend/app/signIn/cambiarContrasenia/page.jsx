"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";


const CambiarContraseniaForm = () => {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const [nuevosDatos, setNuevosDatos] = useState({
    mail: "",
    password: "",
    password2: "",
  });
  const [apiError, setApiError] = useState(null);


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevosDatos.password !== nuevosDatos.password2) {
      setApiError("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }

    if(!token){
      setApiError("Permiso no autorizado. Por favor, inténtelo de nuevo.");
      return;
    }
    const data = {
      mail: nuevosDatos.mail,
      password: nuevosDatos.password,
      token: token, // Incluye el token en la solicitud
    };

    try {
      const response = await axios.post(
        `${apiUrl}/usuarios/cambiarContrasenia`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          },
        }
      );
      
      setApiError(null); // Limpia cualquier error existente
      router.push("/signIn");
    } catch (error) {
        handleError(error);
    }
  };


  const handleError = (error) => {
    if (axios.isAxiosError(error)) {
      if(error.response.data === "\"password\" failed custom validation because La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número"){
        setApiError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número");
      }else{
        setApiError(error.response.data); 
      }
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos({
      ...nuevosDatos,
      [name]: value,
    });
  };

  return (
    <>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem",textAlign: "center"}}>
        Cambiar Contraseña
      </h2>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mail" style={{ display: "block", marginBottom: "0.5rem" }}>
            Email:
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            value={nuevosDatos.mail}
            onChange={handleChange}
            onFocus={() => setApiError(null)}
            placeholder="Email"
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem" }}>
            Nueva Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={nuevosDatos.password}
            onChange={handleChange}
            onFocus={() => setApiError(null)}
            placeholder="Nueva Contraseña"
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <label htmlFor="password2" style={{ display: "block", marginBottom: "0.5rem" }}>
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={nuevosDatos.password2}
            onChange={handleChange}
            onFocus={() => setApiError(null)}
            placeholder="Confirmar Nueva Contraseña"
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
          {apiError && (
                <div className="error card my-5">
                <p>{apiError}</p>
                </div>
            )}
        </form>
      </div>
    </>
  );
};


export default CambiarContraseniaForm;
