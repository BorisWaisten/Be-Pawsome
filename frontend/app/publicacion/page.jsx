'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePublicacion from './CreatePublicacion.jsx';

const Publicacion = () => {
  
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


   // Nuevo estado local para formData
   const [formData, setFormData] = useState({
    titulo: '',
    nombre: '',
    fotos: [],
    edad: '',
    tipoAnimal: '', //PERRO
    descripcion: '',
    sexo: '', //MACHO
    pesoEnKg: '',
    ubicacion: '',
    historiaClinica: '',
  });

  useEffect(() => {
    const obtenerUsuarioLogeado = async () => {
      try {
        const usuarioEnSesion = JSON.parse(sessionStorage.getItem('user'));
        if (usuarioEnSesion && usuarioEnSesion._id) {
          const idUsuario = usuarioEnSesion._id;
          const response = await axios.get(`http://localhost:5000/usuarios/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
          });
          
          setUsuario(response.data);
          setError(null);
        } else {
          setError('No se pudo obtener el ID del usuario de la sesión.');
        }
      } catch (error) {
        console.error(error);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };
  
    obtenerUsuarioLogeado();
  }, []);

  const handlePublicacionSubmit = async (e) => {
    e.preventDefault();
  
    try {

      console.log(formData.tipoAnimal);
      console.log(formData) // quiero probar que sale
      // Crear el animal primero
      const animalResponse = await axios.post(
        'http://localhost:5000/animal/crear',
        {
          nombre: formData.nombre,  // Ajusta según la estructura de tu formulario
          //fotos: formData.fotos,
          edad: formData.edad,
          tipoAnimal: formData.tipoAnimal,
          descripcion: formData.descripcion,
          sexo: formData.sexo,
          pesoEnKg: formData.pesoEnKg,
          ubicacion: formData.ubicacion,
          historiaClinica: formData.historiaClinica,
          idOferente: usuario._id,
          // Otros campos necesarios para la creación del animal
        }
      );
  
      // Luego, utilizar la respuesta del animal para crear la publicación
      const response = await axios.post(
        'http://localhost:5000/publicacion/crear',
        {
          titulo: formData.titulo,
          idUsuario: usuario._id, // Usamos el _id del usuario obtenido
          animal: animalResponse.data, // Usar la respuesta del animal
          // Otros campos necesarios para la creación de la publicación
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
  
      console.log('Publicación creada:', response.data);
      // Puedes manejar la respuesta del servidor según tus necesidades.
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      // Puedes manejar los errores de la solicitud aquí.
    }
  };
  

    // Método para actualizar formData
    const updateFormData = (newData) => {
      setFormData({
        ...formData,
        ...newData,
      });
    };


  // Si se está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando usuario...</div>;
  }

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si el usuario es nulo, muestra un mensaje de error o redirección a la página de inicio de sesión
  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  // Muestra los detalles del usuario y el formulario de nueva publicación
  return (
    <main>
      {/* Pasar el estado local y el método de actualización como propiedades */}
      <CreatePublicacion formData={formData} updateFormData={updateFormData} handleSubmit={handlePublicacionSubmit} />
    </main>
  );
};

export default Publicacion;
