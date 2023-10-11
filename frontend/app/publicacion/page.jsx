<<<<<<< HEAD
import React from 'react';
import Logica from './logica';

export default function RegistrarPage() {
  return (
    <main>
      <h1>Crear Nueva Publicación</h1>
      <Logica />
    </main>
  );
}
=======
import React, { Children } from 'react';
import NuevaPublicacion from '../components/CreatePost';

const Publicacion = () => {
  return (
    <main>
      {Children}
      <NuevaPublicacion />
    </main>
  );
};

export default Publicacion;
>>>>>>> Julian
