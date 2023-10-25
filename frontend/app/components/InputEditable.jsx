"use client";
import { useState } from "react";

export default function InputEditable({ id, valorInicial, onGuardar }) {
  const [valor, setValor] = useState(valorInicial);
  const [editable, setEditable] = useState(false);
  const [campoActualiable, setId] = useState(id);
        
  const handleEditarClick = () => {
    setEditable(true);
  };

  const handleGuardarClick = () => {
    onGuardar(valor,campoActualiable);
    setEditable(false);
  };

  const handleCancelarClick = () => {
    setEditable(false);
  };

  return (
    <div className="items-center justify-center flex w-3/4 p-2 m-1">
      <input
        id={campoActualiable}
        type="text"
        value={valor}
        disabled={editable ? false : true}
        onChange={(event) => setValor(event.target.value)}
        className="flex-grow flex-shrink-0 bg-gray-200 h-8 rounded px-4 text-2xl text-center"
      />
      {!editable && (
        <button
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          onClick={handleEditarClick}
        >
          Editar
        </button>
      )}
      {editable && (
        <>
          <button
            className="flex-shrink-0 bg-violet-300 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
            onClick={handleGuardarClick}
          >
            Guardar
          </button>
          <button
            className="flex-shrink-0 bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
            onClick={handleCancelarClick}
          >
            Cancelar
          </button>
        </>
      )}
    </div>
  );
}
