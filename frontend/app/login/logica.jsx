"use client"
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
    console.log(response.data)
    const { accessToken } = response.data;
    sessionStorage.setItem('token', accessToken);
    onLogin(response.data);
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