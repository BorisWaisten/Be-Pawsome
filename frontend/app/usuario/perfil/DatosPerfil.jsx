"use client";
import React, { useEffect, useState } from "react";
import {
  obtenerUsuarioLogeado,
  editarUsuario,
  obtenerPublicacionesDelUsuario,
} from "@/app/persistencia/peticiones";

export default function Usuario() {
  //const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [publicaciones, setPublicaciones] = useState([]);

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
        // Obtener las publicaciones del usuario
        const { publicaciones } = await obtenerPublicacionesDelUsuario(
          usuario._id
        );
        setPublicaciones(publicaciones);
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
  }, []);

  const handleEditarClick = () => {
    setModalVisible(true); // Mostrar el modal al hacer clic en "Editar"
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
      //router.push('/usuario');
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

  const confirmarEliminar = (publicacionId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (confirmacion) {
      // Llamar a la función para eliminar la publicación
      eliminarPublicacion(publicacionId);
    }
  };

  const eliminarPublicacion = async (publicacionId) => {
    try {
      // Hacer una solicitud DELETE para eliminar la publicación en el backend
      // Implementa esta función usando fetch o axios
      await fetch(
        `http://localhost:5000/publicacion/eliminar/${publicacionId}`,
        {
          method: "DELETE",
        }
      );

      // Actualizar la lista de publicaciones después de eliminar
      const nuevasPublicaciones = publicaciones.filter(
        (publicacion) => publicacion._id !== publicacionId
      );
      setPublicaciones(nuevasPublicaciones);
    } catch (error) {
      console.error(error);
      // Manejar errores, mostrar un mensaje al usuario, etc.
    }
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
        <img
          className=" flex rounded-full m-10 justify-center items-center"
          src={usuario.imagenPerfil}
          alt="Foto de perfil"
          style={{ width: "150px", height: "150px" }}
        />
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

      {/* Lista de publicaciones del usuario */}
      <h1 className="mt-3">Publicaciones del usuario</h1>
      <ul className="divide-y divide-violet-200">
  {Array.isArray(publicaciones) &&
    publicaciones.map((publicacion) => (
      <li key={publicacion._id} className="my-4">
        <div className="flex items-center justify-between space-x-5 border-1 border-gray-200 py-4 px-2">
          <div className="rounded-lg w-24 h-24 overflow-hidden">
            <img
              src={publicacion.animal.fotos[0]}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="text-lg font-medium text-violet-900 truncate">
              {publicacion.titulo}
            </div>
            <div className="text-sm text-black-500">
              {publicacion.animal.descripcion}
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => confirmarEliminar(publicacion._id)}
          >
            Eliminar
          </button>
        </div>
      </li>
    ))}
</ul>

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
    </main>
  );
}
