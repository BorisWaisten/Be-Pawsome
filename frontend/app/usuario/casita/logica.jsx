"use client"

import React, { useEffect, useState } from "react";
import { obtenerUsuarioLogeado } from "@/app/persistencia/peticiones";
import SolicitudesDeUsuario from "@/app/components/Solicitudes/SolicitudesDeUsuario";


const Casita = () => {
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);

    const cargarDatos = async () => {
        try {
            const {usuario, error}=await obtenerUsuarioLogeado();
            if (usuario) {
                setUsuario(usuario);
                setPublicaciones(usuario.casita.publicaciones)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, [] );

    return (
        <div>
            {usuario && (
                <h1>Solicitudes Realizadas</h1>
            )}
            <SolicitudesDeUsuario publicaciones={publicaciones} usuario={usuario}/>
        </div>
    )

}
export default Casita