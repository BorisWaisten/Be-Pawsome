"use client"

import { useState } from 'react';

export default function FormRegisterCloud() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
  
    const handleFileChange = e => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async e => {
      try {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
  
        const res = await fetch('./upload', {
          method: 'POST',
          body: formData,
        });
        const { fileUrl } = await res.json();
        setFileUrl(fileUrl);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <main>
          <div>
            <h1>Ud. esta en subir imagen</h1>
          </div>
  
          <div>
            <form onSubmit={handleSubmit}>
              <input type='file' name='file' onChange={handleFileChange} />
              <button type='submit'>Submit</button>
            </form>
            {fileUrl && (
              <>
                <p><img src={ fileUrl } alt="Uploaded image" /></p>
                <p>{ fileUrl }</p>
              </>
            )}
          </div>
  
          <div>
            <h2>Resources</h2>
            <p>
              <a href="https://github.com/colbyfayock/cloudinary-examples/tree/main/examples/nextjs-upload-formdata">See the code on github.com.</a>
            </p>
          </div>
        </main>
      </>
    )
  }