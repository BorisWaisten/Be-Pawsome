// login/logica.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:5000/usuarios/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const storedUser = response.data.userLogueado;
      const idUsuario = storedUser ? storedUser._id : null;
      const accessToken = response.data.accesToken; // Corregir la propiedad del token

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
    
      // Si esta todo bien redirige al usuario a la página principal
     
      router.refresh()
      router.push('/')
      

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="mail">Email:</label>
      <input
        type="email"
        id="mail"
        name="mail"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Muestra el mensaje de error si existe */}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
