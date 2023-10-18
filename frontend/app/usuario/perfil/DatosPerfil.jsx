"use client";
import React, { useEffect, useState } from 'react';
import { obtenerUsuarioLogeado,editarUsuario } from '@/app/persistencia/peticiones';
import { useRouter } from "next/navigation"
export default function Usuario() {
  //const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal
  const [nuevosDatos, setNuevosDatos] = useState({
   // imagenPerfil: "https://img2.freepng.es/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg",
    nombre: '',
    apellido: '',
    celular: '',
    localidad: '',
    provincia: '',
    nacionalidad: '',
    codigoPostal: '',
    
  });

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const { usuario, error } = await obtenerUsuarioLogeado();
        console.log(usuario._id);
        if (usuario) {
          setUsuario(usuario);
          setError(null);
          // Puedes establecer los valores iniciales del formulario con los datos del usuario aquí
          setNuevosDatos({
            //imagenPerfil: usuario.imagenPerfil,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            celular: usuario.celular,
            localidad: usuario.localidad,
            provincia: usuario.provincia,
            nacionalidad: usuario.nacionalidad,
            codigoPostal: usuario.codigoPostal,
          });
        } else {
          setError(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

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
      setUsuario(await editarUsuario(usuario._id, nuevosDatos));
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
    setNuevosDatos(prevState => ({
      ...prevState,
      [name]: value
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
      <h2>Usuario</h2>
      <img src={usuario.imagenPerfil} alt="Foto de perfil" style={{ width: '150px', height: '150px' }} />
      <p>Nombre: {usuario.nombre}</p>
      <p>Apellido: {usuario.apellido}</p>
      <p>Celular: {usuario.celular}</p>
      <p>Localidad: {usuario.localidad}</p>
      <p>Provincia: {usuario.provincia}</p>
      <p>Nacionalidad: {usuario.nacionalidad}</p>
      <p>Código Postal: {usuario.codigoPostal}</p>
      <button onClick={handleEditarClick}>Editar</button>

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
              <input type="text" name="nombre" value={nuevosDatos.nombre} onChange={handleInputChange} />
            </label>
            <label>
              Apellido:
              <input type="text" name="apellido" value={nuevosDatos.apellido} onChange={handleInputChange} />
            </label>
            <label>
              Celular:
              <input type="text" name="celular" value={nuevosDatos.celular} onChange={handleInputChange} />
            </label>
            <label>
              Localidad:
              <input type="text" name="localidad" value={nuevosDatos.localidad} onChange={handleInputChange} />
            </label>
            <label>
              Provincia:
              <input type="text" name="provincia" value={nuevosDatos.provincia} onChange={handleInputChange} />
            </label>
            <label>
              Nacionalidad:
              <input type="text" name="nacionalidad" value={nuevosDatos.nacionalidad} onChange={handleInputChange} />
            </label>
            <label>
              Código Postal:
              <input type="text" name="codigoPostal" value={nuevosDatos.codigoPostal} onChange={handleInputChange} />
            </label>
            <button type="submit">Guardar Cambios</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </main>
  );
}
