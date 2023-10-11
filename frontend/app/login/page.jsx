"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Login from './logica'; // Importa el componente Login en lugar de Logica

const LoginPage = () => {
  const handleLogin = (userData) => {
    // Aquí puedes manejar los datos del usuario después de iniciar sesión
    console.log('Usuario inició sesión:', userData);
    // Puedes realizar acciones adicionales, como redirigir a otra página, etc.
  };

  return (
    <main>
      <Login onLogin={handleLogin} /> {/* Pasa la función onLogin como prop al componente Login */}
    </main>
  );
};

export default LoginPage;
