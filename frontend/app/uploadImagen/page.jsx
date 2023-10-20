import React from 'react';
import FormRegisterUnico from './FormRegisterUnico'; 
var error = null;

export default function RegistrarPage() {
  return (
    <main>
      <h1>Ud. Esta en Subir Imagen</h1>
      <FormRegisterUnico/>
      {error && <h5 className="text-danger">{error}</h5>}
    </main>
  );
}