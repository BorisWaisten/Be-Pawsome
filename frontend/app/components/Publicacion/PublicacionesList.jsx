import CartaPublicacion from "./CartaPublicacion";
import React, { useState, useEffect } from "react";

export default function PublicacionesList(publicacionesSearch) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    if (Array.isArray(publicacionesSearch.publicaciones)) {
      setPublicaciones(publicacionesSearch.publicaciones);
    }
  }, [publicacionesSearch]);

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(Number(event.target.value));
  };

  //marco indices de la pagina actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = publicaciones.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {publicaciones.length > 0 && (
        <div className="flex justify-center my-4">
          {[
            ...Array(Math.ceil(publicaciones.length / postsPerPage)).keys(),
          ].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-500 hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
        {currentPosts.map((publicacion) =>
          publicacion.estado === "ACTIVA" ? (
            <li key={publicacion._id} className="w-full h-full">
              <CartaPublicacion publicacion={publicacion} />
            </li>
          ) : null
        )}
      </ul>

      <div className="flex justify-center p-20 m-4">
        <label htmlFor="postsPerPage">Publicaciones por página: </label>
        <select
          id="postsPerPage"
          value={postsPerPage}
          onChange={handlePostsPerPageChange}
          className="mx-2 border border-purple-500 text-purple-500 rounded-md"
        >
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
      </div>
    </>
  );
}
