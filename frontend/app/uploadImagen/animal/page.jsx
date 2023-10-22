import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImagenAnimal({ onImageUpload }) {
  const [uploadData, setUploadData] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const dataImagen = new FormData();
      dataImagen.append('file', file);
      dataImagen.append('upload_preset', 'animales');

      const response = await fetch('https://api.cloudinary.com/v1_1/bepawsome/image/upload', {
        method: 'POST',
        body: dataImagen,
      });

      if (!response.ok) {
        throw new Error('Error en la carga de la imagen');
      }

      const data = await response.json();
      setUploadData(data);

      // Llama a la función onImageUpload con el secure_url como argumento
      onImageUpload(data.secure_url);
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
      setError('Error en la carga de la imagen. Por favor, inténtalo de nuevo.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Acepta solo archivos de imagen
  });

  return (
    <div>
      <main>
        <h1>Subir Imagen Animal</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Use Dropzone component */}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar una.</p>
        </div>

        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </main>
    </div>
  );
}

export default ImagenAnimal;
