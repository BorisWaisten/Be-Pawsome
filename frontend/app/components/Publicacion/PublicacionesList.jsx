import CartaPublicacion from "./CartaPublicacion";
import React, { useState, useEffect } from "react";

export default function PublicacionesList(publicacionesSearch) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    setPublicaciones(publicacionesSearch.publicaciones);
  }, [publicacionesSearch]);

  //marco indices de la pagina actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = publicaciones.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex justify-center my-4">
        {[...Array(Math.ceil(publicaciones.length / postsPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-500 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {currentPosts.map((publicacion) => (
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
