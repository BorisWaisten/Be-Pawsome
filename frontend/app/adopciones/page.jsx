'use client'
import axios from "axios";
import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";


function AdopcionCard({ adopcion }) {
  const { data: session } = useSession();
  const [animal, setAnimal] = useState(null);
  const [usuarioOferente, setUsuarioOferente] = useState(null);
  const [usuarioAdoptante, setUsuarioAdoptante] = useState(null);


  useEffect(() => {
    axios
      .get(`/api/animales/${adopcion.animalId}`)
      .then((response) => setAnimal(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`/api/usuarios/${adopcion.usuarioOferenteId}`)
      .then((response) => setUsuarioOferente(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`/api/usuarios/${adopcion.usuarioAdoptanteId}`)
      .then((response) => setUsuarioAdoptante(response.data))
      .catch((error) => console.error(error));
  }, [adopcion]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-5 w-full h-full border border-purple-200 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
      <h3 className="text-xl font-bold mb-4">{animal && animal.nombre}</h3>
      <img
        className="rounded-lg w-full h-72 object-cover border-2 border-purple-300"
        src={animal && animal.fotos ? animal.fotos[0] : ""}
        alt={`Foto de ${animal && animal.nombre}`}
      />
      <p className="font-bold mb-2 text-lg">
        Usuario Oferente: {usuarioOferente && usuarioOferente.nombre}
      </p>
      <p className="font-bold mb-2 text-lg">
        Usuario Adoptante: {usuarioAdoptante && usuarioAdoptante.nombre}
      </p>
    </div>
  );
}

export default AdopcionCard;
