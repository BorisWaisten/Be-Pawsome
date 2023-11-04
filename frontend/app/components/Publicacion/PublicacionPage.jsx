import PublicacionesList from "./PublicacionesList";

function PublicacionPage({publicaciones}) {
  return (
    <div className="mx-auto w-4/5 border p-3">
      {/* Mostrar la lista de publicaciones */}
      <h2 className="text-2xl font-bold mb-8 justify-center">Publicaciones disponibles</h2>
      <PublicacionesList publicaciones={publicaciones}/>
    </div>
  );
}


export default PublicacionPage;