"use client";
import axios from "axios";
import { useState } from "react";
//import { recuperacionContrasenia } from "../../persistencia/peticiones";

export default function FormEnvioLink() {
  const [nuevosDatos, setNuevosDatos] = useState({
    mail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}usuarios/changePassword`,
        nuevosDatos
      );
      console.log(response);
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

  return (
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
  );
}
