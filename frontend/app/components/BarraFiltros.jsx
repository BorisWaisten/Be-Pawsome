import React, { useState } from "react";

const tiposAnimales = ["Perro", "Gato", "Pájaro", "Reptil", "Vaca", "Pez"]; // Ajusta esta lista según tus necesidades

const BarraFiltros = () => {
  const [edadMin, setEdadMin] = useState(0);
  const [edadMax, setEdadMax] = useState(100);
  const [pesoMin, setPesoMin] = useState(0);
  const [pesoMax, setPesoMax] = useState(100);
  const [tipoAnimal, setTipoAnimal] = useState(tiposAnimales[0]);
  const [filtrosModificados, setFiltrosModificados] = useState(false);

  const restablecerFiltros = () => {
    setEdadMin(0);
    setEdadMax(100);
    setPesoMin(0);
    setPesoMax(100);
    setTipoAnimal(tiposAnimales[0]);
    setFiltrosModificados(false);
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setFiltrosModificados(true);
  };

  return (
    <div className="px-10 flex items-center justify-center text-purple-500 border-purple-400 mt-0">
      <p>Filtros:</p>
      <div className="flex items-center space-x-2 px-10">
        <label>Edad:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={edadMin}
          onChange={handleChange(setEdadMin)}
          className="border border-purple-500 rounded px-2 py-1 text-purple-500"
        />
        <span>-</span>
        <input
          type="number"
          min="0"
          max="100"
          value={edadMax}
          onChange={handleChange(setEdadMax)}
          className="border border-purple-500 rounded px-2 py-1 text-purple-500"
        />
      </div>
      <div className="flex items-center space-x-2 px-10">
        <label>Peso:</label>
        <input
          type="number"
          min="0"
          max="100"
          value={pesoMin}
          onChange={handleChange(setPesoMin)}
          className="border border-purple-500 rounded px-2 py-1 text-purple-500"
        />
        <span>-</span>
        <input
          type="number"
          min="0"
          max="100"
          value={pesoMax}
          onChange={handleChange(setPesoMax)}
          className="border border-purple-500 rounded px-2 py-1 text-purple-500"
        />
      </div>
      <select
        value={tipoAnimal}
        onChange={handleChange(setTipoAnimal)}
        className="border border-purple-500 rounded px-2 py-1 text-purple-500"
      >
        {tiposAnimales.map((tipo, index) => (
          <option key={index} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
      <button
        onClick={restablecerFiltros}
        style={{ display: filtrosModificados ? "block" : "none" }}
        className="ml-4 px-2 py-1 border border-purple-500 rounded text-purple-500"
      >
        Restablecer filtros
      </button>
    </div>
  );
};

export default BarraFiltros;
