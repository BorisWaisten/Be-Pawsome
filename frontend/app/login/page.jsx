// page.jsx
"use client"
import React from 'react';
import Logica from './logica';

const LoginPage = () => {
  const handleLogin = (userData) => {
    // Aquí puedes manejar los datos del usuario después de iniciar sesión
    console.log('Usuario inició sesión:', userData);
    // Puedes realizar acciones adicionales, como redirigir a otra página, etc.
  };

  return (
    <main>
      <Logica onLogin={handleLogin} />
    </main>
  );
};

export default LoginPage;
