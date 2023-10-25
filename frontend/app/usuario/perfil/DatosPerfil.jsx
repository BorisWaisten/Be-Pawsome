"use client";
import React, { useEffect, useState } from "react";
import {
  obtenerUsuarioLogeado,
  editarUsuario,
  obtenerPublicacionesDelUsuario,
} from "@/app/persistencia/peticiones";
import InputEditable from "@/app/components/InputEditable";

export default function Usuario() {
  //const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    // imagenPerfil: "https://img2.freepng.es/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg",
    nombre: "",
    apellido: "",
    celular: "",
    localidad: "",
    provincia: "",
    nacionalidad: "",
    codigoPostal: "",
  });

  const cargarUsuario = async () => {
    try {
      const { usuario, error } = await obtenerUsuarioLogeado();
      if (usuario) {
        setUsuario(usuario);
      
        setNuevosDatos(usuario);
      } else {
        setError(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  const actualizarDatos = async (campoActualizable, valor) => {
    try {
      // Hacer una solicitud PUT para actualizar los datos del usuario en el backend
      usuario[valor] = campoActualizable;
      console.log(usuario);
      const usuarioEditado = await editarUsuario(usuario);
      console.log(usuarioEditado)
      setUsuario(usuarioEditado);
    } catch (error) {
      console.error(error);
    }
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // Verifica que se haya seleccionado un archivo
  //   if (file) {
  //     setNuevosDatos(prevState => ({
  //       ...prevState,
  //       imagenPerfil: file
  //     }));
  //   }
  // };

  const handleEditarClick = () => {};

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    try {
      // Hacer una solicitud PUT para actualizar los datos del usuario en el backend

      const {
        _id,
        mail,
        password,
        imagenPerfil,
        esAdmin,
        casita,
        ...datosNecesarios
      } = nuevosDatos;
      console.log(datosNecesarios);
      const usuarioEditado = await editarUsuario(usuario._id, datosNecesarios);

      setUsuario(usuarioEditado);

      setModalVisible(false); // Cerrar el modal después de guardar los cambios
    } catch (error) {
      console.error(error);
      // Manejar errores, mostrar un mensaje al usuario, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado de los nuevos datos cuando el usuario edita los campos del formulario
    setNuevosDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  return (
    <main>
      <div className="flex justify-center items-center">
        <img
          className=" flex rounded-full m-10 justify-center items-center"
          src={usuario.imagenPerfil}
          alt="Foto de perfil"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className="flex flex-col items-center">
        <InputEditable
          id="nombre"
          valorInicial={usuario.nombre}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="apellido"
          valorInicial={usuario.apellido}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="celular"
          valorInicial={usuario.celular}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="localidad"
          valorInicial={usuario.localidad}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="provincia"
          valorInicial={usuario.provincia}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="nacionalidad"
          valorInicial={usuario.nacionalidad}
          onGuardar={actualizarDatos}
        />
        <InputEditable
          id="codigoPostal"
          valorInicial={usuario.codigoPostal}
          onGuardar={actualizarDatos}
        />
      </div>
    </main>
  );
}
