import React, { useEffect, useState } from "react";
import SolicitudesDeUsuario from "../../components/Solicitudes/SolicitudesDeUsuario.jsx";
import { useSession } from "next-auth/react";
import axios from "axios";

const Casita = () => {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [apiError, setApiError] = useState(null);


    useEffect(() => {
        const cargarDatos = async () => {
            try {
                if (session && session.user) {
                    const idUsuario = session.user.id;
                    const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`);
                    const usuarioData = response.data;
                    
                    if (usuarioData) {
                        console.log("Usuario:", usuarioData);
                        setUsuario(usuarioData);
                        setPublicaciones(usuarioData.casita.publicaciones);
                    }
                }
            } catch (error) {
                setApiError(error.response.data);
            }
        };

        cargarDatos();
    }, [session]);

    const actualizarPublicaciones = async (publicacionId) => {
        // Filtrar las publicaciones para quitar la eliminada
        const nuevasPublicaciones = publicaciones.filter(p => p._id !== publicacionId);
        setPublicaciones(nuevasPublicaciones);
    };

    return (
        <div className="text-center">
            {usuario && (
                <h1>Solicitudes Realizadas</h1>
            )}
            <SolicitudesDeUsuario publicaciones={publicaciones} idUsuario={session?.user?.id} actualizarPublicaciones={actualizarPublicaciones} />
            {apiError && (
        <div className="error card my-5">
          <p>{apiError}</p>
        </div>
      )}
        </div>
    );
};

export default Casita;
