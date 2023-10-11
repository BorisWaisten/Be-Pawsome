"use client";
import React from 'react';
import Login from './logica';

const LoginPage = () => {
  const handleLogin = (user) => {
    // Aquí puedes manejar los datos del usuario después de iniciar sesión
    console.log('Usuario inició sesión:', user);
    // Puedes realizar acciones adicionales, como redirigir a otra página, etc.
  };

  return (
    <main>
      <Login onLogin={handleLogin} />
    </main>
  );
};

export default LoginPage;