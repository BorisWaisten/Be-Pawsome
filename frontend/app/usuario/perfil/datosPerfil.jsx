import React, { useEffect, useState } from "react";
import ImagenUsuario from "../../../app/uploadImagen/usuario/page";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Usuario() {
  const router = useRouter();
  const { data: session } = useSession();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);

  const handleEliminarUsuarioClick = () => {
    setConfirmarEliminacion(true);
  };

  const handleConfirmarEliminacion = async () => {
    try {
      console.log(usuario._id);
      // Eliminar publicaciones del usuario

      const publicacionesUsuario = await axios.get(
        `http://localhost:5000/publicacion/publicacionesUsuario/${usuario._id}`
      );
	  
      if (publicacionesUsuario.data.message !== "Sin publicaciones disponibles") {
        await axios.delete(
          `http://localhost:5000/publicacion/usuario/${usuario._id}`
        );
      }

      // Eliminar el usuario
      await axios.delete(`http://localhost:5000/usuarios/${usuario._id}`);

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
      if (session && session.user) {
        const usuario = session.user;
        console.log("usuario", usuario);
        setUsuario(usuario);
        // Inicializa los nuevos datos con los valores del usuario
        setNuevosDatos(usuario);
      } else {
        console.log("La sesión o el usuario no están definidos.");
      }
    } catch (error) {
      setError(error);
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
        `http://localhost:5000/usuarios/editarImagen/${usuario._id}`,{
          imagenPerfil: nuevosDatos.imagenPerfil
        }
      );
      setUsuario(usuarioEditado.data);
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
        ...datosNecesarios
      } = nuevosDatos;

      const usuarioEditado = await axios.put(
        `http://localhost:5000/usuarios/${usuario._id}`,
        nuevosDatos
      );

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
    console.error("Error al cargar el usuario:", error.message); // Utiliza error.message para obtener el mensaje de error
    return <div>{error.message}</div>; // Renderiza el mensaje de error
  }  
  

  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  // Muestra los detalles del usuario y el botón para abrir el modal de edición
  return (
    <main>
      <div
        className="flex justify-center items-center"
        onSubmit={handleGuardarCambios}
      >
        <div className=" flex">
          <img
            className=" flex rounded-full m-10 justify-center items-center"
            src={usuario.picture || usuario.imagenPerfil}
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
              type="button" // Cambiado a type="button" para evitar que el formulario se envíe
              onClick={(e) => handleImageUpload(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
            >
              Subir Imagen
            </button>
          </div>
        </div>
      </div>
      <div className="items-center flex flex-col">
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.nombre}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.apellido}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.celular}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.localidad}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.provincia}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.nacionalidad}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={usuario.codigoPostal}
            disabled
            className="w-1/2 bg-gray-200 h-8 rounded mb-4 px-4 text-2xl text-center flex-2"
          />
          <button
            onClick={handleEditarClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 h-8"
          >
            Editar
          </button>
        </div>
      </div>

      {/* Modal para editar los datos del usuario */}
      {modalVisible && (
        <div className="modal">
          <form onSubmit={handleGuardarCambios}>
            {/* <label>
              Imagen de Perfil:
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label> */}
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={nuevosDatos.nombre}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Apellido:
              <input
                type="text"
                name="apellido"
                value={nuevosDatos.apellido}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Celular:
              <input
                type="text"
                name="celular"
                value={nuevosDatos.celular}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Localidad:
              <input
                type="text"
                name="localidad"
                value={nuevosDatos.localidad}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Provincia:
              <input
                type="text"
                name="provincia"
                value={nuevosDatos.provincia}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Nacionalidad:
              <input
                type="text"
                name="nacionalidad"
                value={nuevosDatos.nacionalidad}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Código Postal:
              <input
                type="text"
                name="codigoPostal"
                value={nuevosDatos.codigoPostal}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Guardar Cambios</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </form>
        </div>
      )}

      <button
        onClick={handleEliminarUsuarioClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Eliminar Usuario
      </button>
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
    </main>
  );
}
