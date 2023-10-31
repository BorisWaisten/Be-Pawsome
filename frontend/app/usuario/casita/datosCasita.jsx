"use client"

import React, { useEffect, useState } from "react";
import SolicitudesDeUsuario from "@/app/components/Solicitudes/SolicitudesDeUsuario";
import { useSession } from "next-auth/react";


const Casita = () => {
    const { data: session } = useSession();
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [usuarioToken, setUsuarioToken] = useState(null);

    const cargarDatos = async () => {
        try {
            const usuario = session?.user?.userLogueado
            const token = session?.user?.accessToken
            if (usuario) {
                setUsuario(usuario);
                setUsuarioToken(token)
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
            <SolicitudesDeUsuario publicaciones={publicaciones} usuarioToken={usuarioToken}/>
        </div>
    )

}
export default Casita