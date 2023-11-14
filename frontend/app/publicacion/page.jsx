'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePublicacion from '../components/Publicaciones/CreatePublicacion.jsx';
import { crearAnimal, crearPublicacion, obtenerUsuarioLogeado } from '../persistencia/peticiones.jsx';

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
    const cargarUsuario = async () => {
      try {
        const { usuario, error } = await obtenerUsuarioLogeado();
        if (usuario) {
          setUsuario(usuario);
          setError(null);
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

  const handlePublicacionSubmit = async (e) => {
    e.preventDefault();
  
    try {

      // Crear el animal primero

      const datosAnimal ={
          nombre: formData.nombre,  
          fotos: formData.fotos,
          edad: formData.edad,
          tipoAnimal: formData.tipoAnimal,
          descripcion: formData.descripcion,
          sexo: formData.sexo,
          pesoEnKg: formData.pesoEnKg,
          ubicacion: formData.ubicacion,
          historiaClinica: formData.historiaClinica,
          oferente: usuario,
      }
      console.log(datosAnimal.fotos);

      const animalResponse = await crearAnimal(datosAnimal);
     
      const datosPublicacion = {
          titulo: formData.titulo,
          usuario: usuario,
          animal: animalResponse,
      }

      // Luego, utilizar la respuesta del animal para crear la publicación
      const responsePublicacion = await crearPublicacion(datosPublicacion);

      console.log('Publicación creada:', responsePublicacion);
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
