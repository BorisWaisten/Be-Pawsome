import React, { useEffect, useState } from "react";
import SolicitudesDeUsuario from "../../components/Solicitudes/SolicitudesDeUsuario";
import { useSession } from "next-auth/react";
import axios from "axios";

const Casita = () => {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);

    const idUsuario = session?.user?.userLogueado._id;


    const cargarDatos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/usuarios/${idUsuario}`);
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
           
            <SolicitudesDeUsuario publicaciones={publicaciones} idUsuario={idUsuario} actualizarPublicaciones={actualizarPublicaciones} />
        </div>
    );
};

export default Casita;
