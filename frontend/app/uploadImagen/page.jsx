import React from 'react';
import FormRegisterCloud from './FormRegisterCloud';

var error = null;

export default function RegistrarPage() {
  return (
    <main>
      <h1>Ud. Esta en Registrarse</h1>
      <FormRegisterCloud/>
      {error && <h5 className="text-danger">{error}</h5>}
    </main>
  );
}