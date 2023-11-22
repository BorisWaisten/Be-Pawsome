import React, { useEffect, useState } from "react";
import SolicitudesDeUsuario from "../../components/Solicitudes/SolicitudesDeUsuario";
import { useSession } from "next-auth/react";
import axios from "axios";
import { forEach } from "lodash";

const Casita = () => {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);

    const idUsuario = session?.user?.userLogueado._id;


    const cargarDatos = async () => {
        try {
            const responseUsuario = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`);
            const responsePublicacion = await axios.get(`http://localhost:5000/publicacion/publicaciones`);
            const usuarioData = responseUsuario.data;
            const publicacionesData= responsePublicacion.data;
            
            if (usuarioData) {
                setUsuario(usuarioData);
                const publicacionFiltrada = [];
    
                publicacionesData.forEach(p => {
                    if (usuarioData.casita.publicaciones) {
                        const array = usuarioData.casita.publicaciones;
                        array.forEach(e => {
                            if (p._id === e._id) {
                                publicacionFiltrada.push(p);
                            }
                        });
                    }
                });
    
                setPublicaciones(publicacionFiltrada);
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
