'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import axios from "axios";
import CreatePublicacion from '../../components/Publicacion/CreatePublicacion.jsx';
import { useRouter } from "next/navigation";
const CrearPublicacion = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);


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
  
  const user = session?.user?.userLogueado;
  const [error, setError] = useState(null); // Move the declaration to the top
  
  useEffect(() => {
      
      const cargarUsuario = async () => {
            try {
            if (user) {
                setUsuario(user);
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

      const animalResponse = await axios.post("http://localhost:5000/animal/crear", datosAnimal);
     
      const datosPublicacion = {
          titulo: formData.titulo,
          usuario: usuario,
          animal: animalResponse.data,
      }

      // Luego, utilizar la respuesta del animal para crear la publicación
      const responsePublicacion = await axios.post("http://localhost:5000/publicacion/crear", datosPublicacion);
      
      console.log('Publicación creada:', responsePublicacion);
      router.push("/");
      // Puedes manejar la respuesta del servidor según tus necesidades.
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      if (error.response && error.response.status === 400) {
        // Si la respuesta es un error de solicitud (Bad Request), actualiza el estado con el mensaje de error
        setError(error.response.data);
      } else {
        // Si es otro tipo de error, puedes manejarlo de otra manera o simplemente mostrar un mensaje genérico
        setError('Error al procesar la solicitud. Por favor, inténtalo de nuevo.');
      }
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

  // Si el usuario es nulo, muestra un mensaje de error o redirección a la página de inicio de sesión
  if (!usuario) {
    return <div>No se pudo cargar el usuario. Por favor, inicia sesión.</div>;
  }

  // Muestra los detalles del usuario y el formulario de nueva publicación
  return (
    <main>
      {/* Pasar el estado local y el método de actualización como propiedades */}
      <CreatePublicacion formData={formData} updateFormData={updateFormData} handleSubmit={handlePublicacionSubmit} />
      {error && <div className='m-2 p-2 bg-red-500 text-white'>{error}</div>}
    </main>
  );
};

export default CrearPublicacion;