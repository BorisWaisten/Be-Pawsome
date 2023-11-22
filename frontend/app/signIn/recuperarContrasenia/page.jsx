"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function FormEnvioLink() {
  const [nuevosDatos, setNuevosDatos] = useState({
    mail: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/usuarios/changePassword",
        nuevosDatos
      );
      console.log(response);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos({
      ...nuevosDatos,
      [name]: value,
    });
  };

  useEffect(() => {
    // Limpiar el estado del modal al desmontar el componente
    return () => {
      setShowModal(false);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-15 m-15">
        <h1 className="flex flex-1 m-2 ">
          <label htmlFor="mail">Email</label>
        </h1>
        <div>
          <input
            type="email"
            id="mail"
            name="mail"
            value={nuevosDatos.mail}
            onChange={handleChange}
            className="flex w-1/4 border-purple-400 shadow appearance-none border rounded  py-2 px-3 text-gray-700"
          />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-violet-700 text-center text-white  font-bold mt-2 w-1/4 items-center justify-center rounded ">
            Enviar
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-violet-700 p-8 rounded shadow-lg text-white">
            Se envió un correo de cambio de contraseña.
          </div>
        </div>
      )}
    </div>
  );
}