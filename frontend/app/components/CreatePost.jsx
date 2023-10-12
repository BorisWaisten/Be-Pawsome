'use client';
import React, { useState, useEffect } from 'react';

const Logica = ({ usuario, handleSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    nombre: '',
    fotos: [],
    edad: '',
    tipoAnimal: '',
    descripcion: '',
    sexo: '',
    pesoEnKg: '',
    ubicacion: '',
    historiaClinica: '',
  });

  const SEXO = {
    MACHO: 'MACHO',
    HEMBRA: 'HEMBRA',
  };

  const TIPOANIMAL = {
    PERRO: 'PERRO',
    GATO: 'GATO',
    CONEJO: 'CONEJO',
    REPTIL: 'REPTIL',
    VACA: 'VACA',
    PEZ: 'PEZ',
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    // Lógica para manejar los archivos, por ejemplo, almacenarlos en formData.fotos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tipoAnimal' && !['PERRO', 'GATO', 'CONEJO', 'REPTIL', 'VACA', 'PEZ'].includes(value)) {
      console.error('Tipo de animal no válido');
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, localStorage.getItem('jwtToken'))}>
      <h1>{formData.titulo}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label>
            Titulo:
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
          </label>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          <label>
            Edad:
            <input type="text" name="edad" value={formData.edad} onChange={handleChange} />
          </label>
          <label>
            Tipo Animal:
            <select name="tipoAnimal" value={formData.tipoAnimal} onChange={handleChange}>
              <option value="PERRO">Perro</option>
              <option value="GATO">Gato</option>
              <option value="CONEJO">Conejo</option>
              <option value="REPTIL">Reptil</option>
              <option value="VACA">Vaca</option>
              <option value="PEZ">Pez</option>
            </select>
          </label>
          {/* Otros campos para la primera columna */}
        </div>

        <div>
          <label>
            Descripción:
            <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
          </label>
          <label>
            Sexo:
            <select name="sexo" value={formData.sexo} onChange={handleChange}>
              {Object.values(SEXO).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>          </label>
          <label>
            Peso en Kg:
            <input type="text" name="pesoEnKg" value={formData.pesoEnKg} onChange={handleChange} />
          </label>
          {/* Otros campos para la segunda columna */}
        </div>
      </div>

      <label>
        Ubicación:
        <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} />
      </label>
      <label>
        Historia Clínica:
        <input type="text" name="historiaClinica" value={formData.historiaClinica} onChange={handleChange} />
      </label>

      <label>
        Fotos:
        <input type="file" name="fotos" value={formData.fotos} onChange={handleChange} multiple />
      </label>

      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default Logica;
