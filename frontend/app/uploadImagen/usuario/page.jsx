"use client"
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImagenUsuario({ onImageUpload }) {
    const [uploadData, setUploadData] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0]
            const dataImagen = new FormData();
            dataImagen.append('file', file);
            dataImagen.append('upload_preset', 'my_usuarios'); 

            const response = await fetch('https://api.cloudinary.com/v1_1/bepawsome/image/upload', {
                method: 'POST',
                body: dataImagen,
            });

            if (!response.ok) {
                throw new Error('Error en la carga de la imagen');
            }

            const data = await response.json();
            setUploadData(data);
            onImageUpload(data.secure_url);


        } catch (error) {
            console.error('Error en la carga de la imagen:', error);
            setError('Error en la carga de la imagen. Por favor, reintenta de nuevo.');
        }        
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
      });
    
      return (
        <div>
          <main>
            <h1>Cargar Imagen de Perfil</h1>
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
