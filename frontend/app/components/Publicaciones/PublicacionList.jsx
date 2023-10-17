import React from "react";
import PublicacionCard from "./PublicacionCard";


function PublicacionList({ publicaciones }) {
  return (
    <div>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id}>
            <PublicacionCard publicacion={publicacion} />
          </li>
        ))}
      </ul>
  
    </div>
    
  );
}

export default PublicacionList;