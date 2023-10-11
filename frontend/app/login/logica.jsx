// logica.jsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usuarios/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { accessToken, user } = response.data;

      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));

      // Llama a la función onLogin con los datos del usuario
      onLogin(response.data); // Cambio aquí
    } catch (error) {
      console.error(error);
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
      <input type="email" id="mail" name="mail" placeholder="Email" onChange={handleChange} required />
      <label htmlFor="password">Contraseña:</label>
      <input type="password" id="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
