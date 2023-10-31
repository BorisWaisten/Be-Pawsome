import { useState } from "react";
//import { recuperacionContrasenia } from "../../persistencia/peticiones";

export default function FormContrasenia ()  {

    const [nuevosDatos, setNuevosDatos] = useState({
        mail: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           // const response = await recuperacionContrasenia(nuevosDatos);
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