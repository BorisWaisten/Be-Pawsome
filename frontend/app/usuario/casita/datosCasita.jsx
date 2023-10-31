import React, { useEffect, useState } from "react";
import SolicitudesDeUsuario from "@/app/components/Solicitudes/SolicitudesDeUsuario";
import { useSession } from "next-auth/react";
import axios from "axios";

const Casita = () => {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);

    const idUsuario = session?.user?.userLogueado._id;


    const cargarDatos = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`);
            const usuarioData = response.data;
            
            if (usuarioData) {
                setUsuario(usuarioData);
                setPublicaciones(usuarioData.casita.publicaciones);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [session]);

    const actualizarPublicaciones = async (publicacionId) => {
        // Filtrar las publicaciones para quitar la eliminada
        const nuevasPublicaciones = publicaciones.filter(p => p._id !== publicacionId);
        setPublicaciones(nuevasPublicaciones);
    };

    return (
        <div>
            {usuario && (
                <h1>Solicitudes Realizadas</h1>
            )}
            <SolicitudesDeUsuario publicaciones={publicaciones} idUsuario={idUsuario} actualizarPublicaciones={actualizarPublicaciones} />
        </div>
    );
};

export default Casita;
