import PublicacionesList from "./PublicacionesList";

function PublicacionPage() {
  return (
    <div className="mx-auto w-4/5 border p-3">
      {/* Mostrar la lista de publicaciones */}
      <h2 className="text-2xl font-bold mb-8 justify-center">Publicaciones disponibles</h2>
      <PublicacionesList />
    </div>
  );
}


export default PublicacionPage;