"use client";
import React, { useEffect, useState } from "react";
import PublicacionesDeUsuario from "@/app/components/Publicaciones/PublicacionesDeUsuario";
import {
  obtenerUsuarioLogeado,
  obtenerPublicacionesDelUsuario,
} from "@/app/persistencia/peticiones";

const Page = () => {
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  const cargarUsuario = async () => {
    try {
      const { usuario, error } = await obtenerUsuarioLogeado();
      if (usuario) {
        setUsuario(usuario);
        console.log(usuario);
        // Obtener las publicaciones del usuario
        const { publicaciones } = await obtenerPublicacionesDelUsuario(
          usuario._id
        );
        setPublicaciones(publicaciones);
        // Inicializa los nuevos datos con los valores del usuario
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  return (
    <div>
      {usuario && (
        <h1>
          Tu perfil, {usuario.nombre} {usuario.apellido}
        </h1>
      )}
      <PublicacionesDeUsuario publicaciones={publicaciones} />
    </div>
  );
};

export default Page;
