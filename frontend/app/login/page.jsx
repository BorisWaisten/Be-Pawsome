<<<<<<< HEAD
'use client'
import React from 'react';
import Logica from './logica';

export default function RegistrarPage() {
  
  const handleLogin = (userData) => {
    // Lógica para manejar el inicio de sesión exitoso, por ejemplo, almacenar el usuario en el estado.
    console.log('Inicio de sesión exitoso', userData);
  };
  
  
=======
"use client"
import React, { useState } from 'react';
import Logica from './logica';

const LoginPage = () => {
  const handleLogin = (userData) => {
    // Aquí puedes manejar los datos del usuario después de iniciar sesión
    console.log('Usuario inició sesión:', userData);
    // Puedes realizar acciones adicionales, como redirigir a otra página, etc.
  };

>>>>>>> Julian
  return (
    <main>
      <Logica onLogin={handleLogin} />
    </main>
  );
<<<<<<< HEAD

  
}
=======
};

export default LoginPage;
>>>>>>> Julian
