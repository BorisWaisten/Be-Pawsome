"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
  });


  //conecta con la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/usuarios/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
<<<<<<< HEAD
      // Puedes manejar la respuesta del servidor aquí si es necesario, por ejemplo, mostrar un mensaje de éxito.
      console.log('Inicio de sesión exitoso:', response.data);
      // window.location.href = 'http://localhost:3000/';
      //sessionStorage.setItem('token',response.data.password)

      onLogin(response.data)
=======
      const { accessToken, user } = response.data;
      
      // Guardar el token y la información del usuario en localStorage
      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));
  
      // Llamar a la función onLogin pasando tanto el token como el usuario completo
      Login(response.data);
>>>>>>> Julian
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