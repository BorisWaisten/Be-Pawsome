"use client";
import React, { useEffect, useState } from "react";
import PublicacionesDeUsuario from "../../components/Publicacion/PublicacionesDeUsuario";
import axios from "axios";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [mensajeSinPublicaciones, setMensajeSinPublicaciones] = useState(null);



  const sinPublicaciones = () => {
    if(publicaciones.length === 0){
      setMensajeSinPublicaciones(true);
    }
  }


  const cargarUsuario = async () => {
    try {
      if (session && session.user) {
        const response = await axios.get(`http://localhost:5000/publicacion/publicacionesUsuario/${session.user.id}`);
        console.log(response.data);
        setPublicaciones(response.data);
        setUsuario(session.user);
      }

      if(publicaciones.length === 0){
        sinPublicaciones();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [session]);

  return (
    <div className="text-center">
      {usuario && (
        <h1>
          Tus Publicaciones, {usuario.nombre} {usuario.apellido}
        </h1>
      )}
      <PublicacionesDeUsuario publicaciones={publicaciones} />
    {/* Sin publicaciones */}
    {mensajeSinPublicaciones && (
      <div>
        <p>No tienen ninguna publicacion creada.</p>
      </div>
    )}
    </div>
  );
};

export default Page;
