function PublicacionCard({ publicacion}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {/* Imagen de la publicación */}
        <Image
          src={publicacion.imagen}
          alt={publicacion.titulo}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        {/* Título de la publicación */}
        <h2 className="text-lg font-bold mb-2">{publicacion.titulo}</h2>
        {/* Descripción de la publicación */}
        <p className="text-gray-700">{publicacion.descripcion}</p>
      </div>
    </div>
  );
}

export default PublicacionCard;