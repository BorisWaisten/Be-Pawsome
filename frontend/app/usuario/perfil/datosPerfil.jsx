import React, { useEffect, useState } from "react";
import ImagenUsuario from "@/app/uploadImagen/usuario/page";
import { signOut, useSession, getCsrfToken } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Usuario() {
  const router = useRouter();
  const { data: session , update} = useSession();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);
  
  const idUsuario=session?.user?.userLogueado._id

  const handleEliminarUsuarioClick = () => {
    setConfirmarEliminacion(true);
  };


  const handleConfirmarEliminacion = async () => {
    try {
      // Eliminar publicaciones del usuario

      const publicacionesUsuario = await axios.get(
        `http://localhost:5000/publicacion/publicacionesUsuario/${idUsuario}`
      );
	  
      if (publicacionesUsuario.data.message !== "Sin publicaciones disponibles") {
        await axios.delete(
          `http://localhost:5000/publicacion/usuario/${idUsuario}`
        );
      }

      // Eliminar el usuario
      await axios.delete(`http://localhost:5000/usuarios/${idUsuario}`);

      // Cierra el modal de confirmación después de eliminar el usuario y sus publicaciones
      setConfirmarEliminacion(false);
      signOut();
    
    } catch (error) {
      console.error("Error al eliminar el usuario y sus publicaciones:", error);
      // Manejar errores, mostrar un mensaje al usuario, etc.
    }
  };

  const [nuevosDatos, setNuevosDatos] = useState({
    imagenPerfil: "",
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
      const usuario = session?.user?.userLogueado;
      console.log("session:", session);
      if (usuario) {
        setUsuario(usuario);
        // Inicializa los nuevos datos con los valores del usuario
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
  }, [session]);

  const handleEditarClick = () => {
    setModalVisible(true); // Mostrar el modal al hacer clic en "Editar"
  };

  const handleImageUpload = async (secureUrl) => {
    // Puedes hacer lo que necesites con secureUrl
    // Actualizar el estado solo para la imagenPerfil

    setNuevosDatos((prevState) => ({
      ...prevState,
      imagenPerfil: secureUrl,
    }));

    // Guardar la imagen en el backend al mismo tiempo
    try {

      const usuarioEditado = await axios.put(
        `http://localhost:5000/usuarios/editarImagen/${idUsuario}`,{
          imagenPerfil: secureUrl, 
        }
      );

      setUsuario(usuarioEditado.data);
      
      await update({userLogueado: usuarioEditado.data})

      return usuario;
    } catch (error) {
      console.error("Error al guardar la imagen en el backend:", error);
      // Manejar errores, mostrar un mensaje al usuario, etc.
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    try {
      // Hacer una solicitud PUT para actualizar los datos del usuario en el backend

      const {
        _id,
        mail,
        password,
        esAdmin,
        casita,
        imagenPerfil,
        intentosFallidos,
        bloqueado,
        ...datosNecesarios
      } = nuevosDatos;

      const usuarioEditado = await axios.put(
        `http://localhost:5000/usuarios/${idUsuario}`,
        datosNecesarios
      );
       // Esta ruta depende de tu configuración en next-auth
       setUsuario(usuarioEditado.data);
       // Esta ruta depende de tu configuración en next-auth
       await update({userLogueado: usuarioEditado.data});


      setModalVisible(false);
      router.refresh(); // Cerrar el modal después de guardar los cambios
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

  // Muestra los detalles del usuario y el botón para abrir el modal de edición

  return (
    <main>
      <div className="flex justify-center items-center">
        <div className="w-full flex">
          <img
            className="flex rounded-full m-10 justify-center items-center"
            src={usuario.imagenPerfil}
            alt="Foto de perfil"
            style={{ width: "200px", height: "150px" }}
          />
        </div>
        <div className="w-full flex items-center">
          <div>
            <ImagenUsuario onImageUpload={handleImageUpload} />
          </div>
          <div className="">
            <button
              type="button"
              onClick={(e) => handleImageUpload(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
            >
              Subir Imagen
            </button>
          </div>
        </div>
      </div>

      <div className="items-center flex flex-col">
        {/* Formulario para editar los campos */}
        <div className="items-center flex flex-col">
  {/* Formulario para editar los campos */}
        <form onSubmit={handleGuardarCambios}>
          {/* Primera fila */}
          <div className="w-full flex mb-4">
            <div className="flex-1">
              <label htmlFor="nombre">1. Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nuevosDatos.nombre}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
            <div className="flex-1 ml-4">
              <label htmlFor="apellido">2. Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={nuevosDatos.apellido}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
          </div>

          {/* Segunda fila */}
          <div className="w-full flex mb-4">
            <div className="flex-1">
              <label htmlFor="celular">3. Celular:</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={nuevosDatos.celular}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
            <div className="flex-1 ml-4">
              <label htmlFor="localidad">4. Localidad:</label>
              <input
                type="text"
                id="localidad"
                name="localidad"
                value={nuevosDatos.localidad}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
          </div>

          {/* Tercera fila */}
          <div className="w-full flex mb-4">
            <div className="flex-1">
              <label htmlFor="provincia">5. Provincia:</label>
              <input
                type="text"
                id="provincia"
                name="provincia"
                value={nuevosDatos.provincia}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
            <div className="flex-1 ml-4">
              <label htmlFor="nacionalidad">6. Nacionalidad:</label>
              <input
                type="text"
                id="nacionalidad"
                name="nacionalidad"
                value={nuevosDatos.nacionalidad}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
            <div className="flex-1 ml-4">
              <label htmlFor="codigoPostal">7. Código Postal:</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={nuevosDatos.codigoPostal}
                onChange={handleInputChange}
                className="w-full bg-gray-200 h-8 rounded px-4 text-2xl text-center"
                disabled={!modalVisible}
              />
            </div>
          </div>

          {/* ... (repetir para otros campos) */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
            style={{ display: modalVisible ? "block" : "none" }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>

        {/* Botón de editar */}
        <button
          onClick={handleEditarClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
        >
          Editar
        </button>

        {/* Botón de eliminar usuario */}
        <button
          onClick={handleEliminarUsuarioClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Eliminar Usuario
        </button>

        {/* Modal de confirmación de eliminación */}
        {confirmarEliminacion && (
          <div className="modal">
            <p>
              ¿Estás seguro de que deseas eliminar este usuario y todas sus
              publicaciones?
            </p>
            <button onClick={handleConfirmarEliminacion}>Sí, Eliminar</button>
            <button onClick={() => setConfirmarEliminacion(false)}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
