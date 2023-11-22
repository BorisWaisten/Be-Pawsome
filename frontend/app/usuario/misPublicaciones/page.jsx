"use client";
import React, { useEffect, useState } from "react";
import PublicacionesDeUsuario from "../../components/Publicacion/PublicacionesDeUsuario";
import axios from "axios";
import { useSession } from "next-auth/react";
import API_BASE_URL from "./config.jsx"


const Page = () => {
    
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  const idUsuario = session?.user?.userLogueado._id;

  const cargarUsuario = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/publicacion/publicacionesUsuario/${idUsuario}`);
      console.log(response.data);
      setPublicaciones(response.data);
      setUsuario(session?.user?.userLogueado);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  return (
    <div>

      <PublicacionesDeUsuario publicaciones={publicaciones} />
    </div>
  );
};

export default Page;