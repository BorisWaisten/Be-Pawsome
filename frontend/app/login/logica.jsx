"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
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
      // Puedes manejar la respuesta del servidor aquí si es necesario, por ejemplo, mostrar un mensaje de éxito.
      console.log('Inicio de sesión exitoso:', response.data);
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error(error);
      // Maneja el error de inicio de sesión según tus necesidades.
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