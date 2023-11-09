"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CambiarContraseniaForm = () => {
    const router = useRouter();
  const [nuevosDatos, setNuevosDatos] = useState({
    mail: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevosDatos.password !== nuevosDatos.password2) {
      setError("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/usuarios/cambiarContrasenia",
        nuevosDatos
      );
      console.log(response);
        router.push("/signIn");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos({
      ...nuevosDatos,
      [name]: value,
    });
    setError("");
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
            placeholder="Confirmar Nueva Contraseña"
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-violet-700 text-center text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};


export default CambiarContraseniaForm;
