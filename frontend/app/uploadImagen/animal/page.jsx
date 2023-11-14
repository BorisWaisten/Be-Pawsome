import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImagenAnimal({ onImageUpload }) {
  const [uploadData, setUploadData] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    try {
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
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
      }
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
      setError('Error en la carga de la imagen. Por favor, inténtalo de nuevo.');
    }
  };
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div>
      <main>
        <h1>Subir Imagen Animal</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div
          {...getRootProps()}
          style={{
            border: '2px dashed #777',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragActive ? '#eee' : '#fff',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta la imagen aquí...</p>
          ) : (
            <p>Haz clic o arrastra una imagen aquí.</p>
          )}
        </div>

        {uploadData && (
          <div>
            <h2>Imagen cargada:</h2>
            <img
              src={uploadData.secure_url}
              alt="Imagen cargada"
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default ImagenAnimal;
