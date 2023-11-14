
import CartaPublicacion from "./CartaPublicacion";
import React, { useState,useEffect } from "react";

export default function PublicacionesList( publicacionesSearch) {
  
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    setPublicaciones(publicacionesSearch.publicaciones);
  }, [publicacionesSearch]);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {publicaciones.map((publicacion) => (
          <li key={publicacion._id} className="w-full h-full">
            <CartaPublicacion publicacion={publicacion} />
          </li>
        ))}
      </ul>
      {publicaciones.length === 0 && (
        <p className="text-center"> Todavía no hay publicaciones realizadas.</p>
      )}
    </>
  );
}
