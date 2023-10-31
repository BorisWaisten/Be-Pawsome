"use client";
import React, { useEffect, useState } from "react";
import PublicacionesDeUsuario from "../../components/Publicacion/PublicacionesDeUsuario";
import axios from "axios";
import { useSession } from "next-auth/react";



const Page = () => {
    
    const { data: session } = useSession();
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  const cargarUsuario = async () => {
    try {
        const usuario = session?.user?.userLogueado;
        if (usuario) {
            setUsuario(usuario);
            console.log(usuario);
            // Obtener las publicaciones del usuario
            const response = await axios.get(`http://localhost:5000/publicacion/publicaciones/${usuario._id}`);
              if (response.ok) {
                const data = await response.json();
                setPublicaciones({ publicaciones: data } );
              }
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