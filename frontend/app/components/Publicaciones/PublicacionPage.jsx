import PublicacionesList from "./PublicacionesList";

function PublicacionPage() {
  const publicaciones = getServerSideProps();

  return (
    <div className="mx-auto w-4/5 border p-3">
      {/* Mostrar la lista de publicaciones */}
      <h2 className="text-2xl font-bold mb-8 justify-center">Publicaciones disponibles</h2>
      <PublicacionesList publicaciones={publicaciones} />
    </div>
  );
}

async function getServerSideProps() {
  // Hacer una llamada a la API para obtener todas las publicaciones
  const res = await fetch(`http://localhost:5000/publicacion/publicaciones`);
  const publicaciones = await res.json();

  return {
    publicaciones,
  };
}

export default PublicacionPage;
