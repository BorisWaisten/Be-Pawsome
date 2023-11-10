"use client";
import axios from "axios";
import { useState } from "react";
//import { recuperacionContrasenia } from "../../persistencia/peticiones";

export default function FormEnvioLink ()  {
    
    const [nuevosDatos, setNuevosDatos] = useState({
        mail: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/usuarios/changePassword", nuevosDatos);
            console.log(response);
        }catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevosDatos({
          ...nuevosDatos,
          [name]: value,
        });
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mail">Email: </label>
          </div>
          <div>
            <input
                type="email"  // Cambiado a "email"
                id="mail"
                name="mail"
                value={nuevosDatos.mail}
                onChange={handleChange}
                />
          </div>
          <div>
            <button type="submit" >Enviar</button>
          </div>
        </form>
      );
    

};