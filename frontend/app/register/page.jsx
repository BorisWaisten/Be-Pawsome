import React from 'react';
import FormRegister from './FormRegister';

var error = null;

export default function RegistrarPage() {
  return (
    <main>
      <FormRegister/>
      {error && <h5 className="text-danger">{error}</h5>}
    </main>
  );
}