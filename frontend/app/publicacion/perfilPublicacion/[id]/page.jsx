// PerfilPublicacionPage.jsx
"use client";

import PerfilPublicacion from "../../../components/Publicacion/PerfilPublicacion";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "./config.jsx"

export default function PerfilPublicacionPage() {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}publicacion/obtener/${id}`);
          setPublicacion(response.data);
        } catch (error) {
          console.error('Error fetching publicacion:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    return <PerfilPublicacion publicacion={publicacion} />;
  }