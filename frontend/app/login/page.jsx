'use client'
import React from 'react';
import Logica from './logica';

export default function RegistrarPage() {
  
  const handleLogin = (userData) => {
    // Lógica para manejar el inicio de sesión exitoso, por ejemplo, almacenar el usuario en el estado.
    console.log('Inicio de sesión exitoso', userData);
  };
  
  
  return (
    <main>
      <Logica onLogin={handleLogin} />
    </main>
  );

  
}