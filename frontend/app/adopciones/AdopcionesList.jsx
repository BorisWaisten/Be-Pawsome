"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import AdopcionCard from "./AdopcionCard";

function AdopcionesList() {
  const [adopciones, setAdopciones] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/adopcion/obtener")
      .then((response) => setAdopciones(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {adopciones &&
          adopciones.map((adopcion) => (
            <li key={adopcion.id}>
              <AdopcionCard adopcion={adopcion} />
            </li>
          ))}
      </ul>
    </>
  );
}

export default AdopcionesList;
