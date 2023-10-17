import React from 'react';
import FormRegister from './FormRegister';

var error = null;

export default function RegistrarPage() {
  return (
    <main>
      <h1>Ud. Esta en Registrarse</h1>
      <FormRegister/>
      {error && <h5 className="text-danger">{error}</h5>}
    </main>
  );
}
