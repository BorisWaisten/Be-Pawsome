import PublicacionList from "./PublicacionList";

function PublicacionPage() {

  const publicaciones =  getServerSideProps();
  console.log(publicaciones)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
      {/* Mostrar la lista de publicaciones */}
      <PublicacionList publicaciones={...publicaciones} />
    </div>
  );
}

 async function getServerSideProps() {
  // Hacer una llamada a la API para obtener todas las publicaciones
  const res = await fetch(`http://localhost:5000/publicacion/publicaciones`);
  const publicaciones = await res.json();

  return {
    publicaciones
  };
}

export default PublicacionPage;